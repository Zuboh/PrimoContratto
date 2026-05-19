# Technology Stack

**Analysis Date:** 2026-05-19

## Languages

**Primary:**
- TypeScript ~5.9.2 - All React Native app code (`app/`, `components/`, `services/`, `stores/`, `hooks/`, `utils/`)

**Secondary:**
- TypeScript (Deno flavor) - Supabase Edge Function (`supabase/functions/analyze-contract/`)
- JavaScript - Config files (`babel.config.js`, `metro.config.js`, `eslint.config.js`)

## Runtime

**Environment:**
- Node.js v20.x (detected: v20.20.1) — local dev toolchain
- Deno 2 — Supabase Edge Function runtime (configured in `supabase/config.toml`: `deno_version = 2`)

**Package Manager:**
- npm
- Lockfile: present (`package-lock.json`, lockfileVersion 3)

## Frameworks

**Core:**
- React Native 0.81.5 — mobile UI primitives
- React 19.1.0 — component model and rendering
- Expo ~54.0.33 — managed React Native workflow and native modules
- Expo Router ~6.0.23 — file-based navigation and routing (entry point: `expo-router/entry`)

**UI:**
- Gluestack UI `@gluestack-ui/themed` ^1.1.73 — themed component library
- Gluestack Style `@gluestack-style/react` ^1.0.57 — styling engine
- React Native Reanimated ~4.1.1 — animation (worklet-based)
- React Native Gesture Handler ~2.28.0 — gesture recognition
- Lucide React Native ^0.576.0 — icon set
- `@expo/vector-icons` ^15.0.3 — additional icon set
- Expo Linear Gradient ~15.0.8 — gradient backgrounds
- Expo Image ~3.0.11 — optimized image component
- React Native SVG 15.12.1 — SVG rendering (with transformer)
- React Native Worklets 0.5.1 — JS worklets for Reanimated

**State Management:**
- Zustand ^5.0.11 — global state stores with persistence middleware
  - Stores: `stores/analysisStore.ts`, `stores/authStore.ts`, `stores/historyStore.ts`, `stores/pendingUpload.ts`

**Testing:**
- None detected

**Build/Dev:**
- EAS (Expo Application Services) — build and submit pipeline (`eas.json`)
- Metro — bundler (`metro.config.js`), extended with `react-native-svg-transformer`
- Babel — transpiler (`babel.config.js`) using `babel-preset-expo` + `react-native-reanimated/plugin`
- ESLint ^9.25.0 — linting (`eslint.config.js`) using `eslint-config-expo`

## Key Dependencies

**Critical:**
- `expo-router` ~6.0.23 — all navigation is file-based; app routes live under `app/`
- `zustand` ^5.0.11 — primary state layer; persisted via AsyncStorage
- `@react-native-async-storage/async-storage` 2.2.0 — local persistence for auth and history stores
- `react-native-reanimated` ~4.1.1 — animations throughout the app; requires Babel plugin
- `expo-document-picker` ~14.0.8 — PDF contract upload
- `expo-image-picker` ~17.0.10 — camera capture of contracts
- `expo-file-system` ~19.0.21 — file reading for base64 conversion
- `expo-crypto` ~15.0.8 — SHA-256 hashing for contract deduplication

**Infrastructure:**
- `expo-splash-screen` ~31.0.13 — splash screen during app init
- `expo-font` ~14.0.11 — custom font loading (Quicksand, Inter, Nunito)
- `expo-haptics` ~15.0.8 — haptic feedback on interactions
- `react-native-safe-area-context` ~5.6.0 — safe area insets
- `react-native-screens` ~4.16.0 — native screen containers
- `expo-web-browser` ~15.0.10 — in-app browser for OAuth/web flows
- `expo-linking` ~8.0.11 — deep linking (`primo://` scheme)
- `dotenv` ^16.6.1 — .env loading in dev

## Configuration

**Environment:**
- Expo public env vars accessed via `process.env.EXPO_PUBLIC_*` in app code
- Required vars: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` (see `constants/config.ts`)
- Edge function secrets accessed via `Deno.env.get()`: `OPENAI_API_KEY` (see `supabase/functions/analyze-contract/lib/openai.ts`)
- Local Supabase dev: `supabase/.env.local` (referenced in `functions:serve` npm script)

**Build:**
- `app.json` — Expo app config (name, scheme, icons, plugins, experiments)
- `eas.json` — EAS build profiles (development, preview, production)
- `tsconfig.json` — TypeScript config extending `expo/tsconfig.base`; path alias `@/*` → root
- `metro.config.js` — Metro bundler config with SVG transformer
- `babel.config.js` — Babel config with Reanimated plugin

**Expo Experiments enabled:**
- `typedRoutes: true` — typed Expo Router paths
- `reactCompiler: true` — React Compiler (experimental)

## Platform Requirements

**Development:**
- Node.js v20+
- Expo CLI / EAS CLI >= 18.4.0
- Supabase CLI (for local edge function dev)
- Deno 2 (for edge function runtime)

**Production:**
- iOS (portrait orientation, supports tablet)
- Android (`com.zuboh.primo`, edge-to-edge enabled)
- Web (static output)
- EAS project ID: `d44dc0d0-d1e5-4242-b0bd-bec66957afa3`

---

*Stack analysis: 2026-05-19*
