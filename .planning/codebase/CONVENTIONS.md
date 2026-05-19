# Coding Conventions

**Analysis Date:** 2026-05-19

## Naming Patterns

**Files:**
- React components: PascalCase filename matching the exported function name (`Button.tsx`, `Toggle.tsx`, `TextField.tsx`)
- Style files: `ComponentName.styles.ts` (e.g., `components/ui/Button/Button.styles.ts`)
- Type files: `ComponentName.types.ts` (e.g., `components/ui/Button/Button.types.ts`)
- Barrel files: `index.ts` at each component/directory level
- Hook files: camelCase prefixed with `use` (`useUpload.ts`, `useBoolean.ts`, `useAnalysis.ts`)
- Store files: camelCase suffixed with `Store` (`authStore.ts`, `analysisStore.ts`, `historyStore.ts`)
- Utility files: camelCase noun (`validation.ts`, `format.ts`, `pdf.ts`, `contract.ts`)
- Screen files (Expo Router): camelCase for route files (`index.tsx`, `login.tsx`, `settings.tsx`)

**Functions:**
- React components: PascalCase named exports (`export function Button(...)`, `export function Toggle(...)`)
- Hooks: camelCase prefixed with `use` (`useBoolean`, `useUpload`, `useAnalysis`)
- Event handlers: camelCase prefixed with `handle` (`handlePickPdf`, `handleCamera`, `handleSubmit`, `handleTabSwitch`)
- Style factory functions: camelCase prefixed with `create` (`createButtonStyles`)
- Utility functions: camelCase verb-noun (`isValidEmail`, `isEmpty`, `formatDate`, `truncate`, `capitalize`)

**Variables:**
- camelCase throughout (`loadingPdf`, `canSubmit`, `passwordStrong`, `fieldBg`)
- Boolean helpers from `useBoolean` use `.value`, `.setTrue`, `.setFalse`, `.toggle` (e.g., `loadingPdf.value`, `loadingPdf.setTrue()`)
- Constants in UPPER_SNAKE_CASE when module-level config objects (`APP`, `API`, `PLAN`, `UPLOAD`, `STORAGE_KEYS`, `ROUTES` in `constants/config.ts`)
- Pixel constant locals: SCREAMING_SNAKE_CASE (`TRACK_W`, `THUMB_SIZE`, `THUMB_TRAVEL` in `components/ui/Toggle/Toggle.tsx`)

**Types and Interfaces:**
- Types (unions/literals): PascalCase (`ButtonVariant`, `ClauseStatus`, `Plan`, `UploadStep`, `Tab`)
- Interfaces: PascalCase prefixed with no `I` (`ButtonProps`, `AuthStore`, `HistoryStore`, `ContractResult`)
- Store interfaces defined directly above the `create<>()` call in the same file
- Props interfaces named `ComponentNameProps` and exported from `.types.ts` file

**Exports:**
- Named exports used throughout — no default exports except Expo Router screen files (`export default function HomeScreen()`, `export default function AuthScreen()`)
- Library barrel files re-export with `export * from './ComponentName'`

## Code Style

**Formatting:**
- Tool: Prettier
- Config: `.prettierrc` at project root
- `semi: false` — no semicolons
- `singleQuote: true` — single quotes for strings
- `tabWidth: 2` — 2-space indentation

**Linting:**
- Tool: ESLint 9 with flat config
- Config: `eslint.config.js` — extends `eslint-config-expo/flat`
- TypeScript resolver enabled (`import/resolver: typescript`)
- `dist/*` ignored
- Run via `npm run lint` (alias to `expo lint`)

## Import Organization

**Order observed across source files:**
1. React and React Native core (`import React from 'react'`, `import { View, Text } from 'react-native'`)
2. Third-party packages (`import Animated from 'react-native-reanimated'`, `import { router } from 'expo-router'`)
3. Internal aliases (`@/hooks/useTheme`, `@/stores/authStore`, `@/contexts/ToastContext`)
4. Relative imports (sibling files: `./Button.styles`, `./Button.types`)

**Path Aliases:**
- `@/*` maps to project root (configured in `tsconfig.json` `paths`)
- Examples: `@/hooks/useTheme`, `@/stores/authStore`, `@/constants/config`, `@/types`, `@/components/ui`
- Relative imports used only within the same component folder (e.g., `./Button.styles`)

## Styling

**Approach: Inline styles + `StyleSheet.create` factory functions**
- Components compute styles by calling a `createXxxStyles(theme, ...)` factory that returns a `StyleSheet.create({})` object
- Example: `createButtonStyles(theme, fullWidth, disabled, size)` in `components/ui/Button/Button.styles.ts`
- Simple inline style objects used when styling is not reused or depends heavily on runtime state (e.g., `Toggle.tsx` uses inline objects for track/thumb)
- `useMemo` wraps style factory calls when dependencies are props: `const styles = useMemo(() => createButtonStyles(theme, fullWidth, disabled, size), [theme, fullWidth, disabled, size])`
- Theme accessed via `useTheme()` hook, which returns the full theme object from `ThemeContext`
- Design System tokens consumed directly: `theme.colors.primary`, `theme.spacing[6]`, `theme.radius.lg`, `theme.shadow.sm`

**Design System constants:**
- Colors: `constants/colors.ts` — `as const` object, exported as `colors` and `type ColorKey`
- Typography: `constants/typography.ts` — `typography`, `fontFamily`, `fontSize`, `lineHeight`
- Spacing/radius/shadow: `constants/spacing.ts` — `spacing` (4px scale), `radius`, `shadow`, `layout`
- Theme assembled in `contexts/ThemeContext.tsx` and provided via `ThemeProvider` in `app/_layout.tsx`

**Font usage:**
- Body/UI text: Nunito family (`Nunito_400Regular`, `Nunito_600SemiBold`, `Nunito_700Bold`, `Nunito_800ExtraBold`)
- Numeric values: Inter family (`Inter_400Regular`, `Inter_700Bold`)
- Auth/onboarding screens: Quicksand family (`Quicksand_400Regular`, `Quicksand_600SemiBold`, `Quicksand_700Bold`)

## Component Structure

**Single-responsibility component folder pattern:**
```
components/ui/Button/
├── Button.tsx         # Component implementation
├── Button.types.ts    # Props interface and variant types
├── Button.styles.ts   # Style factory function
└── index.ts           # Re-exports: export { Button } from './Button'
```

**Sub-component pattern:**
- Private helper components defined in the same file, below the main export
- Example: `TrackThumb` in `Toggle.tsx` — a private function component not exported from the barrel

**Named exports only for components** (barrel `index.ts` re-exports via `export * from './Button'`)

## State Management

**Zustand stores pattern:**
```typescript
// 1. Define interface above create()
interface AuthStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

// 2. create<Interface>() with arrow function body
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // initial state spread inline
      // actions as arrow functions
    }),
    { name: STORAGE_KEYS.user, storage: createJSONStorage(() => AsyncStorage) }
  )
)
```

- Persistent stores (auth, history) use `zustand/middleware` `persist` + `createJSONStorage(() => AsyncStorage)`
- Transient stores (analysis step tracking) use plain `create()` without persistence
- Store state accessed outside React via `useAuthStore.getState()` pattern (used in `hooks/useUpload.ts`, `hooks/useAnalysis.ts`)
- Stores exported from `stores/index.ts` barrel; `authStore.ts` is imported directly in some files due to circular-dependency avoidance

## Error Handling

**Pattern: try/catch with toast notification**
```typescript
try {
  // async operation
} catch (e) {
  toast.error(e instanceof Error ? e.message : 'Errore generico')
} finally {
  loading.setFalse()
}
```

- All async operations in hooks wrap in `try/catch/finally`
- `finally` always resets loading state
- Error messages are Italian user-facing strings
- Service layer (`services/ai.ts`) throws `new Error()` on HTTP failure, caught upstream
- No global error boundary observed

## Logging

**No structured logging framework** — `console.log` used for debug steps in `hooks/useUpload.ts` (numbered debug logs still present in production code)

**Pattern observed:**
```typescript
console.log('1. base64 ok, lunghezza:', base64.length)
console.log('2. hash ok:', hash)
console.log('ERRORE:', e)
```

## Comments

**When to comment:**
- Design System annotations written inline above relevant style property: `// DS: large 14/22px · small 9/14px`, `// pill — half of 30px`
- Section separators in long files using JSX comments: `{/* Header — logo + tagline */}`, `{/* Card */}`
- TODO comments use `// TODO:` prefix

**JSDoc:**
- Used in utility functions in `utils/format.ts` and `utils/validation.ts`
- Format: brief description line + `@example` tag showing input → output
```typescript
/**
 * Formatta una data ISO in formato italiano
 * @example formatDate('2026-02-24') → '24 feb 2026'
 */
```
- Not used in component or hook files

## Function Design

**Parameters:**
- Props destructured at function signature level (no `props.` access)
- Default values set in destructuring: `variant = 'primary'`, `size = 'default'`, `loading = false`
- Single configuration objects passed to style factories rather than individual primitives

**Return Values:**
- Hooks return a plain object with named properties: `return { handlePickPdf, handleCamera, loadingPdf: loadingPdf.value, loadingCamera: loadingCamera.value }`
- Components return JSX directly, no intermediate variable
- Utility functions return typed primitives (boolean, string, number)

## Module Design

**Barrel files:**
- Every component directory has an `index.ts` re-exporting with `export * from './ComponentName'`
- Top-level `components/ui/index.ts` aggregates all UI component barrels
- `stores/index.ts` re-exports all three stores
- `utils/index.ts` acts as utility barrel

---

*Convention analysis: 2026-05-19*
