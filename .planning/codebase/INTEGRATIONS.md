# External Integrations

**Analysis Date:** 2026-05-19

## APIs & External Services

**AI / LLM:**
- OpenAI Chat Completions API — contract analysis and negotiation advice
  - SDK/Client: Raw `fetch` to `https://api.openai.com/v1/chat/completions`
  - Model: `gpt-4o-mini` (configured in `constants/config.ts` and `supabase/functions/analyze-contract/lib/openai.ts`)
  - Auth: `OPENAI_API_KEY` (Deno env secret in edge function)
  - Called from: `supabase/functions/analyze-contract/lib/openai.ts`
  - Response format: `json_object` (structured JSON responses)
  - Used for: PDF/image contract analysis (`handleAnalyze`) and negotiation suggestions (`handleNegotiate`)

**Backend-as-a-Service:**
- Supabase — edge function host and auth infrastructure
  - Project ID: `PrimoContratto`
  - Auth: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` (Expo public env vars)
  - Called from: `services/ai.ts` — app calls `${SUPABASE_URL}/functions/v1/analyze-contract`
  - Edge function entry: `supabase/functions/analyze-contract/index.ts`
  - Note: `services/supabase.ts` exists but is currently a stub (only a comment)

## Data Storage

**Databases:**
- Supabase PostgreSQL (remote) — configured in `supabase/config.toml`, major version 17
  - Not yet actively used from the app (no Supabase JS client calls found in app code)
  - Local dev port: 54322

**Local Storage (on-device):**
- AsyncStorage via `@react-native-async-storage/async-storage` 2.2.0
  - Auth state persisted at key `primocontratto:user` — `stores/authStore.ts`
  - Analysis history persisted at key `primocontratto:analyses` — `stores/historyStore.ts`
  - Onboarding state at key `primocontratto:onboarding_done` — `constants/config.ts`
  - Last sync timestamp at key `primocontratto:last_sync` — `constants/config.ts`

**File Storage:**
- Supabase Storage — configured in `supabase/config.toml` (50MiB limit, S3 protocol enabled)
  - Not yet actively used from the app
- Local device filesystem (temporary) — `expo-file-system` used for reading uploaded PDFs/images before base64 conversion in `utils/pdf.ts`

**Caching:**
- In-memory + AsyncStorage: contract analysis results are cached by SHA-256 hash in `stores/historyStore.ts` to avoid re-analyzing the same document. Hash generated via `expo-crypto` SHA-256 in `utils/pdf.ts`.

## Authentication & Identity

**Auth Provider:**
- Supabase Auth (configured, not yet fully wired to a Supabase JS client in app)
  - Email/password auth enabled (`supabase/config.toml`: `[auth.email]`)
  - OTP length: 6 digits, expiry: 1 hour
  - No email confirmation required (`enable_confirmations = false`)
  - JWT expiry: 3600s (1 hour), refresh token rotation enabled
  - Apple OAuth configured in config but disabled (`[auth.external.apple]`)
  - SMS/MFA/Social providers: all disabled
  - Implementation: `stores/authStore.ts` stores user state (plan, analysis count) in AsyncStorage using Zustand persist
  - Login/Register screens: `app/(auth)/login.tsx`, `app/(auth)/register.tsx`

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry, Firebase Crashlytics, or similar)

**Logs:**
- `console.log` / `console.error` throughout the codebase
- Edge function logs viewable via `npm run functions:logs` (Supabase CLI)

## CI/CD & Deployment

**Hosting:**
- Expo Application Services (EAS) — iOS and Android builds
  - Development: internal distribution with `expo-dev-client`
  - Preview: internal distribution
  - Production: auto-increment build number (`eas.json`)
- Supabase — edge function hosting
  - Deploy: `npm run functions:deploy` → `supabase functions deploy analyze-contract`

**CI Pipeline:**
- None detected (no GitHub Actions, CircleCI, or similar configuration found)

## Environment Configuration

**Required env vars (app — set as Expo public vars):**
- `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous (public) key

**Required secrets (edge function — Supabase secrets):**
- `OPENAI_API_KEY` — OpenAI API key for GPT-4o-mini calls

**Secrets location:**
- App env vars: `.env` or `.env.local` at project root (not committed; no .env files found in repo)
- Edge function secrets: `supabase/.env.local` (referenced in `npm run functions:serve` script)
- Production edge function secrets: managed via Supabase dashboard / Supabase CLI `secrets set`

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected (all external calls are request-response, not webhook-based)

## Native Device Integrations

**Camera:**
- `expo-camera` ~17.0.10 and `expo-image-picker` ~17.0.10
- Permission: `NSCameraUsageDescription` set to Italian string in `app.json`
- Used in: `hooks/useUpload.ts` (`handleCamera`)

**Document/File Picker:**
- `expo-document-picker` ~14.0.8
- iCloud Container: Production (`app.json`)
- Permission: `NSDocumentsFolderUsageDescription` set in `app.json`
- Used in: `hooks/useUpload.ts` (`handlePickPdf`)

**Haptics:**
- `expo-haptics` ~15.0.8
- Used in: `hooks/useUpload.ts` on camera trigger

---

*Integration audit: 2026-05-19*
