# Codebase Structure

**Analysis Date:** 2026-05-19

## Directory Layout

```
Primo/
├── app/                        # Expo Router screens (file-based routes)
│   ├── _layout.tsx             # Root stack + providers
│   ├── index.tsx               # Onboarding (entry point for new users)
│   ├── upload.tsx              # Document upload screen
│   ├── loading.tsx             # Analysis in-progress screen
│   ├── onboarding.tsx          # Onboarding preview (DEV shortcut)
│   ├── playground.tsx          # Design system playground (DEV only)
│   ├── (auth)/                 # Auth group
│   │   ├── _layout.tsx
│   │   ├── login.tsx           # Login + register (tab-based, single screen)
│   │   └── register.tsx        # Redirects to login (stub)
│   ├── (tabs)/                 # Main tab group
│   │   ├── _layout.tsx         # Hides native tabs, mounts BottomNav
│   │   ├── index.tsx           # Home / dashboard
│   │   ├── history.tsx         # Analysis history
│   │   └── settings.tsx        # User settings
│   └── report/
│       └── [id].tsx            # Analysis report (dynamic route)
│
├── components/                 # All UI components
│   ├── ui/                     # Design system primitives
│   │   ├── Badge/
│   │   ├── BottomSheet/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── IllustrationPlaceholder/
│   │   ├── Logo/
│   │   ├── Radio/
│   │   ├── Skeleton/
│   │   ├── Spinner/
│   │   ├── TextField/
│   │   ├── Toast/
│   │   ├── Toggle/
│   │   └── index.ts            # Re-exports all UI components
│   ├── reports/                # Report screen components
│   │   ├── AnomaliesCard/
│   │   ├── ClauseCard/
│   │   ├── ClauseList/
│   │   ├── MissingClausesCard/
│   │   ├── PayslipHeader/
│   │   ├── PayslipItemCard/
│   │   ├── PayslipItems/
│   │   ├── ScoreBar/
│   │   ├── SummeryCard/        # Note: typo in directory name (should be SummaryCard)
│   │   ├── WarningBanner/
│   │   └── index.ts
│   ├── onboarding/             # Onboarding slide components
│   │   ├── Slide1/
│   │   ├── Slide2/
│   │   ├── Slide3/
│   │   ├── WindLeaf/           # Animated leaf mascot
│   │   ├── WindTrail/
│   │   └── index.ts
│   ├── home/                   # Home screen components
│   │   ├── GuideCard/
│   │   └── index.ts
│   ├── layout/                 # Layout components
│   │   └── BottomNav/          # Custom tab bar (used on all screens)
│   │       ├── BottomNav.tsx
│   │       ├── BottomNav.config.ts
│   │       ├── BottomNav.styles.ts
│   │       ├── BottomNav.types.ts
│   │       └── index.ts
│   ├── loading/                # Loading screen components
│   │   └── AnalysisChips/
│   │       ├── AnalysisChips.tsx
│   │       ├── AnalysisChips.config.ts
│   │       ├── Chip/
│   │       └── index.ts
│   └── upload/
│       └── UploadZone/         # Upload UI component
│
├── hooks/                      # Custom React hooks
│   ├── useAnalysis.ts          # Analysis orchestration (calls AI service)
│   ├── useAnalysisProgress.ts  # Fake timed progress UI
│   ├── useBoolean.ts           # Boolean toggle utility
│   ├── useMountEffect.ts       # Run effect once on mount
│   ├── useTheme.ts             # Access ThemeContext
│   ├── useToast.ts             # Toast state management
│   └── useUpload.ts            # File/camera pick orchestration
│
├── stores/                     # Zustand state stores
│   ├── analysisStore.ts        # Ephemeral: in-flight analysis state
│   ├── authStore.ts            # Persisted: user session + plan
│   ├── historyStore.ts         # Persisted: past analysis entries
│   ├── pendingUpload.ts        # Module singleton: in-flight upload payload
│   └── index.ts                # Re-exports the three Zustand stores
│
├── services/                   # External service clients
│   ├── ai.ts                   # Supabase Edge Function HTTP client
│   └── supabase.ts             # Stub (comment only — not implemented)
│
├── contexts/                   # React Context providers
│   ├── ThemeContext.tsx         # Static theme/design-token provider
│   └── ToastContext.tsx         # Toast message provider
│
├── constants/                  # Design tokens and app config
│   ├── colors.ts               # Full color palette (sage/warm cream design system)
│   ├── typography.ts           # Font families, sizes, text styles
│   ├── spacing.ts              # Spacing scale, border radii, shadows, layout
│   ├── motion.ts               # Animation constants
│   └── config.ts               # APP, API, PLAN, UPLOAD, ANALYSIS, STORAGE_KEYS, ROUTES
│
├── types/
│   └── index.ts                # All shared TypeScript types and interfaces
│
├── utils/                      # Pure utility functions
│   ├── contract.ts             # Contract-related helpers
│   ├── format.ts               # Formatting helpers
│   ├── pdf.ts                  # PDF base64 conversion, hash, size check
│   ├── validation.ts           # Validation helpers
│   └── index.ts                # Re-exports all utils
│
├── assets/
│   └── images/                 # App images (logos, illustrations)
│
├── supabase/
│   └── functions/
│       └── analyze-contract/   # Deno edge function
│           ├── index.ts        # Entry point (Deno.serve)
│           ├── types.ts        # Server-side types
│           ├── handlers/
│           │   ├── analyze.ts  # PDF/image → OpenAI analyze
│           │   └── negotiate.ts# Analysis JSON → OpenAI negotiate
│           ├── lib/
│           │   ├── cors.ts     # CORS headers + response helpers
│           │   ├── openai.ts   # OpenAI client wrapper
│           │   └── validate.ts # Input validation
│           ├── prompts/
│           │   ├── analize.ts  # System prompt for analysis
│           │   └── negotiate.ts# System prompt for negotiation
│           └── utils/
│               ├── pdf.ts      # PDF text extraction (Deno)
│               └── pdf-parse.d.ts
│
├── docs/                       # Design docs and screenshots
├── scripts/                    # Build/utility scripts
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase map documents
└── .claude/                    # Claude Code config and commands
```

## Directory Purposes

**`app/`:**
- Purpose: All screens, defined by Expo Router file conventions
- Contains: Screen components, route groups `(auth)` and `(tabs)`, dynamic route `report/[id]`
- Key files: `_layout.tsx` (root), `index.tsx` (entry/onboarding), `upload.tsx`, `loading.tsx`, `report/[id].tsx`

**`components/ui/`:**
- Purpose: Design system primitives, reusable across all screens
- Contains: Button, Badge, Card, TextField, Toast, Skeleton, Spinner, Toggle, Checkbox, Radio, BottomSheet, Logo, IllustrationPlaceholder
- Key files: `components/ui/index.ts` (barrel export)

**`components/reports/`:**
- Purpose: Feature components for the report screen only
- Contains: ClauseCard, ClauseList, ScoreBar, SummaryCard, WarningBanner, PayslipHeader, PayslipItems, AnomaliesCard, MissingClausesCard

**`components/layout/BottomNav/`:**
- Purpose: Custom tab navigation bar rendered on every screen
- Contains: BottomNav.tsx (component), BottomNav.config.ts (tab definitions), BottomNav.styles.ts, BottomNav.types.ts

**`hooks/`:**
- Purpose: All custom hooks — orchestrate business logic, never render UI
- Key files: `useUpload.ts`, `useAnalysis.ts`, `useAnalysisProgress.ts`, `useTheme.ts`

**`stores/`:**
- Purpose: All application state
- Contains: Three Zustand stores + one module-level singleton
- Key files: `authStore.ts` (persisted), `historyStore.ts` (persisted), `analysisStore.ts` (ephemeral), `pendingUpload.ts` (module singleton)

**`services/`:**
- Purpose: External API communication layer
- Contains: `ai.ts` (Supabase Edge Function client), `supabase.ts` (stub)

**`constants/`:**
- Purpose: Single source of truth for all design tokens and configuration values
- Key files: `colors.ts` (palette), `typography.ts` (text styles), `spacing.ts` (spacing/radius/shadow), `config.ts` (app config, plan limits, upload limits)

**`types/`:**
- Purpose: Shared TypeScript types used across mobile app
- Key files: `index.ts` (all types: AnalysisResult, AnalysisEntry, User, UploadStep, etc.)

**`supabase/functions/analyze-contract/`:**
- Purpose: Serverless backend — AI analysis and negotiation
- Contains: Deno HTTP server, OpenAI integration, PDF parsing, prompt templates

## Naming Conventions

**Files:**
- Screen files: camelCase matching the route — `upload.tsx`, `loading.tsx`
- Component directories: PascalCase — `BottomNav/`, `GuideCard/`
- Component files: PascalCase matching directory — `BottomNav.tsx`
- Config/styles/types split: `ComponentName.config.ts`, `ComponentName.styles.ts`, `ComponentName.types.ts`
- Hooks: camelCase with `use` prefix — `useAnalysis.ts`, `useTheme.ts`
- Stores: camelCase with `Store` suffix — `analysisStore.ts`, `authStore.ts`
- Every component directory has a barrel `index.ts`

**Directories:**
- Route groups: parenthesized lowercase — `(auth)/`, `(tabs)/`
- Component categories: lowercase — `ui/`, `reports/`, `onboarding/`, `layout/`
- Feature component directories: PascalCase

## Where to Add New Code

**New screen:**
- File: `app/[routeName].tsx` for modal/stack screens
- File: `app/(tabs)/[routeName].tsx` for tabbed screens
- Register in: `app/_layout.tsx` Stack.Screen block

**New feature component (screen-specific):**
- Directory: `components/[feature]/[ComponentName]/`
- Files: `[ComponentName].tsx`, `index.ts`
- Add to: `components/[feature]/index.ts` barrel

**New UI primitive:**
- Directory: `components/ui/[ComponentName]/`
- Files: `[ComponentName].tsx`, `index.ts`
- Add to: `components/ui/index.ts` barrel

**New hook:**
- File: `hooks/use[Name].ts`
- No registration needed — import directly

**New store:**
- File: `stores/[name]Store.ts`
- Add to: `stores/index.ts` re-export

**New service / external client:**
- File: `services/[name].ts`
- Import directly in hooks

**New utility function:**
- Add to appropriate `utils/[category].ts` file (contract, format, pdf, validation)
- It will be re-exported via `utils/index.ts`

**New design token:**
- Colors: `constants/colors.ts`
- Typography: `constants/typography.ts`
- Spacing / radius / shadow: `constants/spacing.ts`
- App config / limits: `constants/config.ts`
- ThemeContext picks these up automatically — no ThemeContext changes needed for new tokens

**New edge function handler:**
- Add handler file: `supabase/functions/analyze-contract/handlers/[action].ts`
- Register action in: `supabase/functions/analyze-contract/index.ts` switch statement
- Add corresponding client function in: `services/ai.ts`

## Special Directories

**`.planning/`:**
- Purpose: GSD orchestrator planning and codebase maps
- Generated: No (manually maintained)
- Committed: Yes

**`.claude/`:**
- Purpose: Claude Code commands and worktrees
- Generated: Partially
- Committed: Yes

**`supabase/`:**
- Purpose: Supabase Edge Functions (Deno runtime, deployed separately)
- Generated: No
- Committed: Yes

**`docs/`:**
- Purpose: Design screenshots and superpower specs
- Generated: No
- Committed: Yes

**`.expo/`:**
- Purpose: Expo build cache
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-05-19*
