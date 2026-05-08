# PrimoContratto — System Design

> Last updated: 2026-05-08

## What is this app?

Italian AI-powered document analyzer. Users upload a work contract (contratto) or payslip (busta paga) → AI extracts and explains key information → user gets a scored report with actionable insights and a negotiation script.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo 54 |
| Language | TypeScript |
| Routing | Expo Router v6 (file-based) |
| State | Zustand v5 |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| AI | OpenAI GPT-4o mini (via Supabase Edge Function) |
| UI | Custom component library (Lucide icons, Inter font) |
| Animations | React Native Reanimated v4 |

---

## Folder Structure

```
app/                    # Screens (Expo Router file-based routing)
  (tabs)/               # Tab group: index, history, settings
  login.tsx             # Auth: login screen
  register.tsx          # Auth: register screen
  upload.tsx            # File upload + document type selector
  loading.tsx           # Analysis progress screen
  report/[id].tsx       # Analysis report (dynamic route)
  negotation/[id].tsx   # Negotiation script (dynamic route)
  _layout.tsx           # Root layout: fonts, auth guard, providers

components/
  ui/                   # Primitives: Button, Card, Badge, Spinner, Toggle, Toast, Logo
  layout/               # BottomNav (Revolut-style with floating FAB)
  home/                 # Home-specific: HeroSection, GuideCard, TrustPills, StatCard
  reports/              # Report-specific: ScoreBar, WarningBanner, ClauseList, PayslipItems...
  upload/               # UploadZone
  loading/              # AnalysisChips

constants/
  colors.ts             # Color tokens (light + dark variants)
  typography.ts         # Font sizes, families, pre-built text styles
  spacing.ts            # Spacing scale, radius, shadows, layout constants
  config.ts             # App config: API keys refs, plan limits, STORAGE_KEYS, ROUTES

contexts/
  ThemeContext.tsx       # Provides theme object; swaps light/dark tokens based on themeStore
  ToastContext.tsx       # Global toast notifications

hooks/
  useTheme.ts           # useContext(ThemeContext) shorthand
  useUpload.ts          # PDF picker + camera logic → pendingUpload → navigation to /loading
  useBoolean.ts         # Simple boolean toggle utility

stores/                 # Zustand stores (all persisted with AsyncStorage)
  themeStore.ts         # isDark: boolean — dark mode preference
  authStore.ts          # user: User | null — plan, analysesThisMonth (legacy, prefer Supabase auth)
  analysisStore.ts      # Current analysis: step, result, fileName — NOT persisted
  historyStore.ts       # entries: AnalysisEntry[] — full analysis history
  pendingUpload.ts      # In-memory (no Zustand): base64, hash, fileName, type, documentType

services/
  supabase.ts           # Supabase client (AsyncStorage auth, autoRefresh)
  ai.ts                 # Edge function caller: sends document to Supabase → OpenAI

types/
  index.ts              # All TypeScript types: AnalysisEntry, ContractResult, PayslipResult, etc.

supabase/               # Supabase edge functions and migrations
```

---

## Core Data Flow

```
User selects document type (Contratto / Busta Paga)
         ↓
User picks PDF or takes photo  →  useUpload hook
         ↓
File → base64 → hash generated  (utils/pdf.ts)
         ↓
Check historyStore for cached result by hash
  → Cache HIT: skip analysis, navigate to report directly
  → Cache MISS: continue
         ↓
Set pendingUpload { base64, hash, fileName, type, documentType }
         ↓
Check canAnalyze()  →  plan limit gate (3 free / month)
         ↓
Navigate to /loading
         ↓
analysisStore.setStep('receiving') → Supabase Edge Function called
         ↓
Edge Function → OpenAI GPT-4o mini → structured JSON response
         ↓
analysisStore.setAnalysis(result, fileName)
historyStore.addEntry(entry)   ← persisted to AsyncStorage
         ↓
Navigate to /report/[id]
```

---

## Auth Flow

```
App launch
  → _layout.tsx checks supabase.auth.getSession()
  → No session  →  router.replace('/login')
  → Session     →  show (tabs)

Login / Register
  → supabase.auth.signInWithPassword()  or  signInWithOAuth('google')
  → onAuthStateChange fires  →  session set  →  router.replace('/(tabs)')

Logout (Impostazioni screen)
  → supabase.auth.signOut()  →  session null  →  router.replace('/login')
```

**Google OAuth — required Supabase dashboard config:**
1. Authentication → URL Configuration → Site URL: `primocontratto://`
2. Redirect URLs: add `primocontratto://auth/callback`
3. Authentication → Providers → Google → enable + paste Client ID/Secret from Google Cloud Console

---

## Navigation Architecture

```
Stack (Expo Router, animation: fade)
├── login.tsx
├── register.tsx
├── (tabs)/               ← custom BottomNav rendered in _layout.tsx
│   ├── index.tsx         → Home       (page 0)
│   ├── history.tsx       → Storico    (page 1)
│   └── settings.tsx      → Impostazioni (page 2)
├── upload.tsx            ← FAB (+) navigates here
├── loading.tsx
├── report/[id].tsx
└── negotation/[id].tsx
```

**BottomNav rules:**
- Rendered ONCE in `app/(tabs)/_layout.tsx` — never in individual tab screens
- 3 tabs + floating FAB (not inside tab row)
- FAB → `router.push('/upload')`
- Tab buttons → `router.push(route)` + sync active state

---

## Theme System

```typescript
const theme = useTheme()

theme.colors.primary        // #0891B2 light / #22D3EE dark
theme.colors.background     // #FFFFFF / #0A0F1E
theme.colors.surface        // #F8FAFC / #111827
theme.colors.border         // #E2E8F0 / #334155
theme.colors.foreground     // #0F172A / #F1F5F9
theme.colors.muted          // #64748B / #94A3B8

theme.typography.h1         // 28px bold
theme.typography.body       // 14px regular
theme.typography.caption    // 14px regular (small use)

theme.spacing[4]            // 16px
theme.radius.lg             // 16px
theme.isDark                // boolean
```

Dark mode: `useThemeStore().isDark` → `ThemeContext` rebuilds token set automatically. Components don't need manual `isDark` checks — they get correct colors from `theme.colors.*`.

**Component styling pattern (required):**
```typescript
const theme = useTheme()
const styles = useMemo(() => createStyles(theme), [theme])
```

Never use hardcoded hex colors in components. Always `theme.colors.*`.

---

## Component Pattern

Every component follows this exact structure:

```
components/domain/ComponentName/
  ComponentName.tsx        ← React component
  ComponentName.styles.ts  ← createStyles(theme: Theme) factory function
  ComponentName.types.ts   ← TypeScript interfaces/props
  ComponentName.config.ts  ← Static data or mappings (optional)
  index.ts                 ← Barrel export ⚠️ MUST NOT be empty
```

**⚠️ Critical gotcha:** Always verify `index.ts` has actual exports before importing from a directory path. An empty `index.ts` produces a silent "Element type is invalid: got undefined" crash at runtime.

---

## State Management

| Store | File | Persisted | Purpose |
|-------|------|-----------|---------|
| `useThemeStore` | `stores/themeStore.ts` | ✅ AsyncStorage | Dark mode preference |
| `useAuthStore` | `stores/authStore.ts` | ✅ AsyncStorage | Legacy: user plan + monthly count |
| `useHistoryStore` | `stores/historyStore.ts` | ✅ AsyncStorage | Full analysis history |
| `useAnalysisStore` | `stores/analysisStore.ts` | ❌ Memory | In-progress analysis state |
| `pendingUpload` | `stores/pendingUpload.ts` | ❌ Module var | File data during upload→loading |

**Note:** `authStore` is legacy — real auth state now comes from `supabase.auth.getSession()`. Eventually migrate user plan tracking to Supabase database.

---

## Design System

| Token | Light | Dark |
|-------|-------|------|
| Primary | `#0891B2` | `#22D3EE` |
| Background | `#FFFFFF` | `#0A0F1E` |
| Surface | `#F8FAFC` | `#111827` |
| Card | `#FFFFFF` | `#1E293B` |
| Border | `#E2E8F0` | `#334155` |
| Foreground | `#0F172A` | `#F1F5F9` |
| Muted | `#64748B` | `#94A3B8` |
| Success | `#0B7B3E` | `#34D399` |
| Warning | `#C05B00` | `#FBBF24` |
| Destructive | `#DC2626` | `#F87171` |

- **Style:** Minimalism + Swiss Style
- **Font:** Inter (Regular 400, Medium 500, SemiBold 600, Bold 700)
- **Base body size:** 14px
- **Icons:** Lucide React Native, stroke width 2px
- **SafeAreaView:** ALWAYS from `react-native-safe-area-context` — never from `react-native`

---

## Working with Claude on This Project

### Session start
Claude auto-loads memory from `.claude/projects/.../memory/MEMORY.md`. Architecture context is pre-loaded — no need to re-explain.

### Implementing features
1. Check `TASKS.md` for priority and notes on each task
2. Follow component pattern (4 files + non-empty `index.ts`)
3. All colors via `theme.colors.*` — never hardcode hex
4. `SafeAreaView` from `react-native-safe-area-context`
5. Stores go in `stores/` directory
6. `import type { X }` for Supabase types (avoids ESLint false positive on `import/no-unresolved`)

### Session end checklist
- [ ] Mark completed tasks in `TASKS.md` with ✅
- [ ] Add newly discovered tasks to `TASKS.md`
- [ ] Update `CLAUDE.md` if new npm scripts or commands added
- [ ] Update this file if architecture changed significantly

### Common mistakes
| Mistake | Correct approach |
|---------|-----------------|
| `import { X } from '@/components/ui/Foo'` without checking | Verify `Foo/index.ts` has exports |
| `import { SafeAreaView } from 'react-native'` | Use `react-native-safe-area-context` |
| `import { Session } from '@supabase/supabase-js'` | Use `import type` |
| `<BottomNav />` inside a tab screen | BottomNav lives in `_layout.tsx` only |
| Creating `store/newStore.ts` | Use `stores/newStore.ts` (plural) |
| Hardcoded color in StyleSheet | Use `theme.colors.X` |
