# Testing Patterns

**Analysis Date:** 2026-05-19

## Test Framework

**Runner:** None configured

No test runner is present in the project. There is no `jest.config.*`, `vitest.config.*`, or any equivalent configuration file at the project root or in any subdirectory.

**devDependencies (from `package.json`):**
- `@types/react` ~19.1.0
- `eslint` ^9.25.0
- `eslint-config-expo` ~10.0.0
- `typescript` ~5.9.2

No `jest`, `vitest`, `@testing-library/react-native`, `@testing-library/jest-native`, or any test assertion library is installed.

**Run Commands:**
```bash
# No test commands defined
npm run lint   # Static analysis only — runs expo lint (ESLint)
```

The `scripts` block in `package.json` contains: `start`, `reset-project`, `android`, `ios`, `web`, `lint`, `functions:serve`, `functions:deploy`, `functions:logs`. No `test` script exists.

## Test File Organization

**No test files found.** A search across the entire repository for `*.test.*` and `*.spec.*` files returned zero results.

## Test Structure

Not applicable — no tests exist.

## Mocking

Not applicable — no mocking framework installed.

## Fixtures and Factories

**No test fixtures or factories exist.**

The closest analog is mock data used inline in production code:

- Auth screen (`app/(auth)/login.tsx:62-68`) creates a mock user on submit using `'mock-' + Date.now()` as the ID. This is not a test fixture — it is live mock authentication standing in for a real Supabase auth integration.
- `stores/authStore.ts` — the `canAnalyze()` logic and `analysesThisMonth` counter operate on in-memory state seeded by mock login, not test data.

## Coverage

**Requirements:** None — no coverage tooling configured.

**Coverage command:** Not available.

## Test Types

**Unit Tests:** None
**Integration Tests:** None
**E2E Tests:** None

## Quality Assurance — What Exists Instead

The project relies on the following non-test quality mechanisms:

**Static type checking:**
- TypeScript ~5.9.2 with `expo/tsconfig.base`
- Path alias `@/*` → project root
- All component props typed via dedicated `.types.ts` files (e.g., `components/ui/Button/Button.types.ts`)
- Domain types centralized in `types/index.ts`

**Linting:**
- ESLint 9 flat config (`eslint.config.js`) extending `eslint-config-expo/flat`
- TypeScript import resolver enabled
- Run via `npm run lint`

**Manual smoke testing:**
- Dev-only playground screen at `app/playground.tsx` (430 lines) provides a visual rendering environment for all UI components with all variant combinations
- Accessible in development via "Design System Playground" button in home tab (`app/(tabs)/index.tsx:154-162`), gated behind `__DEV__`
- Onboarding preview also accessible via `__DEV__` gate

**Mock authentication:**
- Auth screen bypasses real Supabase auth; tapping submit creates a mock user in the Zustand auth store directly
- Allows full app flow testing without backend connectivity

## Recommendations for Adding Tests

If tests are added in the future, the following patterns are recommended given the existing stack:

**Framework choice:** `jest` + `@testing-library/react-native` + `jest-expo` preset (standard for Expo projects)

**Priority targets:**
1. `utils/format.ts` — pure functions, zero dependencies, easy to unit test
2. `utils/validation.ts` — pure functions, zero dependencies
3. `utils/pdf.ts` — hash generation and size checking logic
4. `utils/contract.ts` — contract utility logic
5. Zustand stores (`stores/authStore.ts`, `stores/historyStore.ts`, `stores/analysisStore.ts`) — pure state logic testable without React

**Component test targets (lower priority):**
- `components/ui/Button/Button.tsx` — variant rendering, disabled state, loading state
- `components/ui/Toggle/Toggle.tsx` — value/onToggle interaction
- `hooks/useBoolean.ts` — simplest hook, good starting point

**Where to place test files (recommended convention):**
- Co-locate alongside source: `utils/format.test.ts`, `stores/authStore.test.ts`
- Or gather in a top-level `__tests__/` directory

---

*Testing analysis: 2026-05-19*
