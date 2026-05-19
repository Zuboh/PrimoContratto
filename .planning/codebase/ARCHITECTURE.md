<!-- refreshed: 2026-05-19 -->
# Architecture

**Analysis Date:** 2026-05-19

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Expo Router (file-based routing)            │
│  app/_layout.tsx · app/index.tsx · app/(tabs)/ · app/(auth) │
└──────────┬──────────────────┬──────────────────┬────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌──────────────────┐ ┌────────────────┐ ┌──────────────────────┐
│  Screen Layer    │ │  Hook Layer    │ │  Context Layer       │
│  app/**/*.tsx    │ │  hooks/*.ts    │ │  contexts/*.tsx      │
│                  │ │                │ │  ThemeContext.tsx     │
│  - upload.tsx    │ │  - useUpload   │ │  ToastContext.tsx     │
│  - loading.tsx   │ │  - useAnalysis │ └──────────────────────┘
│  - report/[id]   │ │  - useTheme    │
│  - (tabs)/       │ │  - useToast    │
│  - (auth)/       │ └───────┬────────┘
└─────────┬────────┘         │
          │                  ▼
          │       ┌──────────────────────┐
          │       │   Store Layer        │
          │       │   stores/*.ts        │
          │       │                      │
          │       │  - analysisStore     │
          │       │  - authStore (persist│
          │       │  - historyStore(pers)│
          │       │  - pendingUpload     │
          │       └──────────┬───────────┘
          │                  │
          ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│                    services/ai.ts                            │
│   analyzeContract() · negotiateContract()                   │
└───────────────────────────────┬─────────────────────────────┘
                                │  HTTP fetch
                                ▼
┌─────────────────────────────────────────────────────────────┐
│           Supabase Edge Function (Deno runtime)              │
│   supabase/functions/analyze-contract/index.ts               │
│                                                              │
│   handlers/analyze.ts   →  OpenAI GPT-4o-mini               │
│   handlers/negotiate.ts →  OpenAI GPT-4o-mini               │
│   utils/pdf.ts          →  text extraction                   │
│   prompts/analize.ts    →  system prompt                     │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | Font loading, provider wrapping, stack navigation | `app/_layout.tsx` |
| OnboardingScreen | 3-slide FlatList onboarding, redirects if logged in | `app/index.tsx` |
| AuthScreen | Tab-based login/register, mock auth writes to authStore | `app/(auth)/login.tsx` |
| TabsLayout | Hides native tab bar, mounts custom BottomNav | `app/(tabs)/_layout.tsx` |
| HomeScreen | Greeting + last payslip hero card + GuideCard | `app/(tabs)/index.tsx` |
| HistoryScreen | List of past analysis entries | `app/(tabs)/history.tsx` |
| SettingsScreen | User settings | `app/(tabs)/settings.tsx` |
| UploadScreen | Document picker + camera trigger | `app/upload.tsx` |
| LoadingScreen | Animated chip progress + waits for analysis | `app/loading.tsx` |
| ReportScreen | Full analysis display (contract or payslip) | `app/report/[id].tsx` |
| BottomNav | Custom persistent tab bar (all screens) | `components/layout/BottomNav/BottomNav.tsx` |
| useUpload | File/camera pick → hash → pendingUpload → navigation | `hooks/useUpload.ts` |
| useAnalysis | Calls analyzeContract, bridges to store + history | `hooks/useAnalysis.ts` |
| useAnalysisProgress | Fake timed progress synced to OpenAI readiness | `hooks/useAnalysisProgress.ts` |
| analysisStore | Ephemeral in-flight analysis state + result | `stores/analysisStore.ts` |
| authStore | User session, plan, analysis count (persisted) | `stores/authStore.ts` |
| historyStore | Past AnalysisEntry list with hash-based cache lookup (persisted) | `stores/historyStore.ts` |
| pendingUpload | Module-level singleton for in-flight upload payload | `stores/pendingUpload.ts` |
| ai.ts | HTTP client to Supabase Edge Function | `services/ai.ts` |
| Edge Function | Dispatches analyze/negotiate to OpenAI | `supabase/functions/analyze-contract/index.ts` |

## Pattern Overview

**Overall:** Feature-flow architecture with file-based routing, Zustand stores for state, and a Supabase Edge Function backend.

**Key Characteristics:**
- Screens are thin; business logic lives in hooks and stores
- Zustand stores are accessed both as React hooks and via `.getState()` outside of render (e.g., `useHistoryStore.getState()` in `hooks/useUpload.ts`)
- ThemeContext provides a static design-token object (no dynamic theming)
- Navigation is managed exclusively via `expo-router` `router.*` calls in hooks, not in components

## Layers

**Screen Layer:**
- Purpose: Render UI, delegate all logic to hooks
- Location: `app/`
- Contains: React Native screen components
- Depends on: hooks, stores, components, contexts
- Used by: expo-router navigation

**Hook Layer:**
- Purpose: Orchestrate business flows (upload, analysis, auth)
- Location: `hooks/`
- Contains: Custom hooks combining stores, services, navigation
- Depends on: stores, services, contexts
- Used by: screen layer

**Store Layer:**
- Purpose: Hold all client-side state
- Location: `stores/`
- Contains: Zustand stores (persisted and ephemeral) + a module singleton
- Depends on: AsyncStorage (for persisted stores), types
- Used by: hooks, screens

**Service Layer:**
- Purpose: All external HTTP communication
- Location: `services/ai.ts`
- Contains: `analyzeContract()` and `negotiateContract()` functions
- Depends on: EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY env vars
- Used by: `hooks/useAnalysis.ts`

**Component Library:**
- Purpose: Reusable, themed UI primitives and feature components
- Location: `components/ui/`, `components/reports/`, `components/onboarding/`, `components/home/`, `components/layout/`, `components/upload/`, `components/loading/`
- Contains: Presentational components only — no direct store access
- Depends on: ThemeContext via `useTheme`
- Used by: screen layer

**Edge Function (Backend):**
- Purpose: AI document analysis and negotiation
- Location: `supabase/functions/analyze-contract/`
- Contains: Deno server, handlers, OpenAI client, PDF parser, prompts
- Depends on: OpenAI API key (server-side env var)
- Used by: `services/ai.ts`

**Constants / Design Tokens:**
- Purpose: Single source of truth for theme values and config
- Location: `constants/`
- Contains: `colors.ts`, `typography.ts`, `spacing.ts`, `motion.ts`, `config.ts`
- Depends on: nothing
- Used by: ThemeContext, components

## Data Flow

### Primary Analysis Flow

1. User taps pick/camera in `app/upload.tsx` → `useUpload` hook (`hooks/useUpload.ts`)
2. `useUpload` reads file, converts to base64, generates SHA hash, checks `historyStore` cache
3. If no cache hit: stores payload in `pendingUpload` singleton (`stores/pendingUpload.ts`), calls `setStep('receiving')`, pushes `/loading`
4. `app/loading.tsx` mounts, calls `useAnalysis()` (`hooks/useAnalysis.ts`) and `useAnalysisProgress()`
5. `useAnalysis` calls `analyzeContract(base64, type)` from `services/ai.ts` — fires immediately
6. `services/ai.ts` POSTs to Supabase Edge Function (`supabase/functions/analyze-contract/index.ts`)
7. Edge function: parses PDF text or passes image vision to OpenAI via `handlers/analyze.ts`
8. `useAnalysisProgress` advances fake step timer; waits for `analysisReady` flag before completing
9. `onAllDone()` in `useAnalysis` writes result to `analysisStore`, adds `AnalysisEntry` to `historyStore`, increments `authStore.analysesThisMonth`, navigates to `/report/[id]`
10. `app/report/[id].tsx` reads `currentAnalysis` from `analysisStore`, renders contract or payslip view

### Cache Hit Flow

1. `useUpload` hashes PDF → calls `historyStore.getCachedByHash(hash)`
2. If found: calls `analysisStore.setAnalysis(cached.result, cached.fileName)`, navigates directly to `/report/[id]` — skips upload and loading screens entirely

### Auth Flow

1. `app/index.tsx` (Onboarding) checks `authStore.isLoggedIn` — redirects to `/(tabs)` if already logged in
2. After onboarding, navigates to `/(auth)/login`
3. `app/(auth)/login.tsx` handles both login and register tabs; on submit calls `authStore.setUser()` with a mock user object, then navigates to `/(tabs)`
4. **Note:** Auth is currently mocked — no real Supabase Auth integration exists

**State Management:**
- Ephemeral analysis state: `stores/analysisStore.ts` (Zustand, in-memory)
- Persisted user + session: `stores/authStore.ts` (Zustand + AsyncStorage)
- Persisted analysis history: `stores/historyStore.ts` (Zustand + AsyncStorage)
- In-flight upload payload: `stores/pendingUpload.ts` (module-level variable, not persisted)

## Key Abstractions

**AnalysisResult (discriminated union):**
- Purpose: Type-safe document analysis output
- Definition: `types/index.ts` — `ContractResult | PayslipResult | UnknownResult`
- Pattern: Discriminated by `documentType` field; report screen switches on this

**AnalysisEntry:**
- Purpose: Persisted history record including hash for cache lookup
- Definition: `types/index.ts`
- Pattern: Hash-based deduplication — same PDF never analyzed twice

**Theme:**
- Purpose: Static design token object consumed via `useTheme()`
- Definition: `contexts/ThemeContext.tsx`, tokens in `constants/`
- Pattern: `const { colors, typography, spacing, radius, shadow } = useTheme()`

**UploadStep:**
- Purpose: Enum-like type tracking analysis pipeline state
- Definition: `types/index.ts` — `'idle' | 'receiving' | 'reading' | 'checking_ccnl' | 'preparing' | 'done' | 'error'`

## Entry Points

**App Bootstrap:**
- Location: `app/_layout.tsx`
- Triggers: Expo app launch
- Responsibilities: Load fonts, hide splash screen, wrap providers (ThemeProvider, ToastProvider), define Stack navigator

**Upload Entry:**
- Location: `app/upload.tsx`
- Triggers: User navigates to `/upload` via BottomNav
- Responsibilities: Render UploadZone, delegate file logic to `useUpload`

**Edge Function Entry:**
- Location: `supabase/functions/analyze-contract/index.ts`
- Triggers: HTTP POST from `services/ai.ts`
- Responsibilities: Route `action` field to `handleAnalyze` or `handleNegotiate`

## Architectural Constraints

- **Threading:** React Native JS thread; no worker threads. Analysis progress timer uses `setInterval` at 80ms tick in `hooks/useAnalysisProgress.ts`
- **Global state:** `stores/pendingUpload.ts` uses a module-level variable `_pending` — not reactive, accessed imperatively
- **No real backend auth:** `app/(auth)/login.tsx` creates a mock user with `'mock-' + Date.now()` as ID; Supabase Auth is not wired up
- **Edge Function only — no direct DB calls:** The mobile app never queries Supabase database directly; `services/supabase.ts` is a stub with only a comment
- **Report screen uses store, not route params:** `app/report/[id].tsx` reads `currentAnalysis` from `analysisStore` rather than fetching by the `id` param — the param is only used for `historyStore.getEntryById` identification

## Anti-Patterns

### Report screen ignores its own route param for data

**What happens:** `app/report/[id].tsx` reads `useAnalysisStore().currentAnalysis` rather than loading the entry from `historyStore.getEntryById(id)` using the URL param
**Why it's wrong:** Navigating to a historical report URL directly (or reloading the app) results in `currentAnalysis` being null and the screen immediately redirecting to `/`
**Do this instead:** Read `id` from `useLocalSearchParams`, look up the entry via `useHistoryStore().getEntryById(id)`, fall back to `currentAnalysis` only for just-analyzed documents

### Inline styles scattered across screens

**What happens:** Screens like `app/(tabs)/index.tsx` and `app/report/[id].tsx` contain large inline style objects inside JSX
**Why it's wrong:** Hard to maintain, prevents style reuse, and inflates component render functions
**Do this instead:** Use `StyleSheet.create()` or a `createStyles(theme)` factory pattern (already established in `components/layout/BottomNav/BottomNav.styles.ts`)

### Auth is mocked with no real integration

**What happens:** `app/(auth)/login.tsx` `handleSubmit()` always succeeds and creates a local-only mock user
**Why it's wrong:** No real session, no server-side identity — plan/limit enforcement is entirely client-side and bypassable
**Do this instead:** Integrate Supabase Auth client in `services/supabase.ts` and call `supabase.auth.signInWithPassword()` / `signUp()`

## Error Handling

**Strategy:** Toast-based user feedback for all async errors; route-back recovery for fatal states

**Patterns:**
- Hook-level try/catch with `toast.error(message)` in `hooks/useUpload.ts` and `hooks/useAnalysis.ts`
- `useAnalysis` calls `reset()` + `router.back()` on analysis failure
- Edge function returns `{ error: string }` JSON — client checks and throws
- Report screen redirects to `/` if `currentAnalysis` is null

## Cross-Cutting Concerns

**Logging:** `console.log` / `console.error` only. Debug logs present in production paths (e.g., `hooks/useUpload.ts` lines 41–69). No structured logging or remote error tracking.
**Validation:** File size checked in `useUpload` via `utils/pdf.ts:isFileTooLarge`. Analysis quota checked via `authStore.canAnalyze()`. No form validation library.
**Authentication:** Mocked. `authStore.isLoggedIn` used as gate; `authStore.canAnalyze()` enforces free tier limit client-side only.

---

*Architecture analysis: 2026-05-19*
