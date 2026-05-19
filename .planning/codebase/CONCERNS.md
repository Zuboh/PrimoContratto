# Codebase Concerns

**Analysis Date:** 2026-05-19

---

## Tech Debt

**Mock authentication — no real backend session:**
- Issue: `handleSubmit` in the login screen fabricates a local user object with `id: 'mock-' + Date.now()` and stores it directly via `setUser`. There is no call to Supabase Auth, no JWT, no server-side session. Any user can "log in" with any credentials.
- Files: `app/(auth)/login.tsx` lines 60–68, `stores/authStore.ts` lines 23–25
- Impact: The quota system (`analysesThisMonth`) is entirely client-controlled and trivially resettable by clearing AsyncStorage. No real identity is attached to analysis history. Supabase RLS rules (if added later) would have nothing to enforce against.
- Fix approach: Replace `handleSubmit` body with `supabase.auth.signInWithPassword` / `signUp`, read the returned session user, and call `setUser` with the real Supabase UID. Initialize the Supabase client in `services/supabase.ts` (currently an empty stub).

**`supabase.ts` is an empty stub:**
- Issue: `services/supabase.ts` contains only a comment: `//Client Supabase`. There is no exported client.
- Files: `services/supabase.ts` lines 1–2
- Impact: Any future code that imports the Supabase client from this file will get `undefined` at runtime with no compile-time error.
- Fix approach: Initialize and export the client — `createClient(API.supabaseUrl, API.supabaseAnonKey)` — before any auth integration work begins.

**Monthly quota never resets:**
- Issue: `authStore.ts` stores `analysesThisMonth` as a plain incrementing counter. There is no `monthResetAt` field on the `User` type, no cron, no comparison against the calendar month. The counter only reaches the limit and stays there forever.
- Files: `stores/authStore.ts` lines 27–35 and 37–42, `types/index.ts` lines 100–103
- Impact: A free user who uses all three analyses in January can never analyze again — even in February — without clearing app storage manually.
- Fix approach: Add a `monthResetAt: string` field to `User`. In `canAnalyze()`, compare `new Date(user.monthResetAt).getMonth()` against the current month and reset `analysesThisMonth` to `0` if the month has turned over.

**`isFileTooLarge` receives a stringified byte-count but compares it as a base64 length:**
- Issue: The function signature is `isFileTooLarge(base64: string): boolean` and it compares `base64.length > UPLOAD.maxBase64Length`. At the call site in `useUpload.ts` line 35 the argument is `file.size.toString()` — the raw byte count cast to a string, whose `.length` is 1–10 digits (e.g. `"10485760"` has length 8). The comparison `8 > 2_700_000` is always `false`, so files of any size pass the check silently.
- Files: `utils/pdf.ts` lines 37–39, `hooks/useUpload.ts` lines 35–36
- Impact: Files larger than 10 MB are not rejected at the pick stage. They proceed to `uriToBase64` and generate an oversized base64 string that is then passed to the edge function, causing large payloads, slow uploads, and potential 413 / timeout errors from Supabase.
- Fix approach: Change the call site to pass the numeric size directly — `isFileTooLarge(file.size)` — and update the signature to `isFileTooLarge(bytes: number): boolean { return bytes > UPLOAD.maxFileSizeBytes }`.

**`validateAnalyzeRequest` is defined but never called:**
- Issue: `supabase/functions/analyze-contract/lib/validate.ts` exports `validateAnalyzeRequest`, and `handleNegotiate` correctly calls `validateNegotiateRequest`. However `handleAnalyze` in `handlers/analyze.ts` casts the body directly — `const { base64, type } = body as { base64: string; type: 'pdf' | 'image' }` — with no validation call before the cast.
- Files: `supabase/functions/analyze-contract/handlers/analyze.ts` lines 6–8, `supabase/functions/analyze-contract/lib/validate.ts` lines 1–13
- Impact: A malformed or empty request to the `analyze` action reaches `callOpenAI` with `undefined` arguments, causing a non-descriptive 500 error instead of a clear 400. Also widens the attack surface for prompt injection.
- Fix approach: Add `const validationError = validateAnalyzeRequest(body); if (validationError) return error(400, validationError)` as the first lines of `handleAnalyze`, mirroring the pattern in `handleNegotiate`.

**Broken scanned-PDF fallback sends raw base64 to a text model:**
- Issue: When `extractTextFromPdf` returns fewer than 100 characters (scanned PDF), `handleAnalyze` falls back by slicing the base64 string to 50,000 characters and sending it as plain text. GPT-4o-mini is not a vision model when called via the text chat completions endpoint; it cannot decode or interpret raw base64 PDF bytes.
- Files: `supabase/functions/analyze-contract/handlers/analyze.ts` lines 49–58
- Impact: Every scanned PDF silently produces a fabricated or nonsensical analysis result.
- Fix approach: Replace the base64 fallback with a vision-capable call using `image_url` and `data:application/pdf;base64,...`, or return a clear 422 error telling the user the document is a scanned image.

**Camera upload flow never navigates to loading screen:**
- Issue: `handleCamera` in `useUpload.ts` calls `setStep('receiving')` at line 114 but never calls `router.push('/loading')`. The PDF flow explicitly pushes the loading route (line 68). After a successful camera capture the app sets state but stays on the upload screen indefinitely.
- Files: `hooks/useUpload.ts` lines 108–116
- Impact: Camera uploads are fully broken — the pending upload is set, the step is updated, but the analysis loop in `useAnalysis` (which lives on the loading screen) never starts.
- Fix approach: Add `router.push('/loading')` after `setStep('receiving')` at line 115, identical to the PDF path.

**`expo-file-system/legacy` import:**
- Issue: `utils/pdf.ts` line 4 imports from `expo-file-system/legacy`. This is a transitional compatibility shim with no guarantee of longevity past SDK 53/54.
- Files: `utils/pdf.ts` line 4
- Impact: When the shim is removed, `uriToBase64` will break at runtime with no compile-time warning.
- Fix approach: Migrate `uriToBase64` to use `import { readAsStringAsync } from 'expo-file-system/next'`.

---

## Known Bugs

**Google SSO button has no `onPress` handler:**
- Symptoms: Tapping "Continua con Google" on the login screen does nothing. The `<Pressable>` element has no `onPress` prop.
- Files: `app/(auth)/login.tsx` lines 285–303
- Trigger: Tap the Google button on the login tab.
- Workaround: None. The button is visually prominent but completely inert.

**"Password dimenticata?" button has no handler:**
- Symptoms: The forgot-password `<Pressable>` renders with an empty `style` prop and no `onPress`. Tapping it does nothing.
- Files: `app/(auth)/login.tsx` lines 235–241
- Trigger: Tap "Password dimenticata?" on the login tab.
- Workaround: None.

**Report screen ignores the `[id]` URL parameter:**
- Symptoms: `app/report/[id].tsx` never calls `useLocalSearchParams()`. It reads data exclusively from `useAnalysisStore().currentAnalysis` (in-memory Zustand state). If the user deep-links to `/report/abc123`, navigates back from history, or returns to an app that was backgrounded and evicted, `currentAnalysis` is `null` and the screen immediately redirects to `/`.
- Files: `app/report/[id].tsx` lines 22–29, `stores/historyStore.ts` lines 34–35
- Trigger: Open a history entry, background the app, foreground and tap the entry again. Or share/deep-link a report URL.
- Fix approach: Add `const { id } = useLocalSearchParams<{ id: string }>()` and fall back to `useHistoryStore.getState().getEntryById(id)` when `currentAnalysis` is null.

---

## Security Considerations

**No server-side rate limiting on the edge function:**
- Risk: The `analyze-contract` Supabase edge function accepts any request bearing the public anon key. There is no per-IP or per-user call throttle. A script can call it indefinitely, burning the project's OpenAI quota.
- Files: `supabase/functions/analyze-contract/index.ts`, `supabase/functions/analyze-contract/lib/cors.ts`
- Current mitigation: None. Client-side `canAnalyze()` check is trivially bypassed by calling the function URL directly.
- Recommendations: Add rate-limit counter in Supabase Postgres or Upstash Redis, keyed on `x-forwarded-for` or user JWT sub. Or enforce limits at the Supabase API gateway level.

**Quota enforcement is entirely client-side:**
- Risk: `canAnalyze()` runs in the React Native process. Any user can clear AsyncStorage, uninstall/reinstall, or call the edge function URL directly to bypass the 3-analysis free limit.
- Files: `stores/authStore.ts` lines 37–42
- Recommendations: Mirror quota check server-side once real auth is in place — store `analyses_this_month` in a Supabase row keyed on `user_id` and enforce it in the edge function before calling OpenAI.

**Anon key grants unauthenticated access to edge function:**
- Risk: `EXPO_PUBLIC_SUPABASE_ANON_KEY` is a public key by design, but it grants unauthenticated access to the edge function. Any user can extract it from the app bundle and call the analyze endpoint without going through the app's quota logic.
- Files: `services/ai.ts` lines 1–3, `constants/config.ts` lines 12–13
- Recommendations: Require a valid Supabase Auth JWT (`Authorization: Bearer <user-jwt>`) in the edge function and reject requests bearing only the anon key without a valid session token.

---

## Performance Bottlenecks

**Entire PDF base64 passed as request body:**
- Problem: `uriToBase64` reads the entire PDF into memory as a base64 string. This string is held in module-level state via `pendingUpload`, passed to the edge function as a JSON body field, and logged to console. For a 10 MB PDF, the base64 string is ~13.3 MB held simultaneously in the React Native JS heap and in the fetch payload.
- Files: `utils/pdf.ts` lines 20–25, `stores/pendingUpload.ts`, `hooks/useUpload.ts` lines 40–43
- Improvement path: Upload the PDF to Supabase Storage, pass the storage URL to the edge function, and let Deno download it server-side. Eliminates the in-app memory spike and the large JSON payload.

**Scanned-PDF text extraction runs inside the edge function cold path:**
- Problem: `extractTextFromPdf` in `supabase/functions/analyze-contract/utils/pdf.ts` uses `npm:unpdf` synchronously on the Deno edge function. For large PDFs this adds latency on every cold invocation. If extraction fails, the fallback sends 50,000 raw base64 characters to the LLM — a wasted OpenAI call.
- Files: `supabase/functions/analyze-contract/utils/pdf.ts` lines 1–12, `supabase/functions/analyze-contract/handlers/analyze.ts` lines 34–58

---

## Fragile Areas

**`pendingUpload` module-level singleton is lost on app reload:**
- Files: `stores/pendingUpload.ts`
- Why fragile: The pending upload is stored as a module-level `let _pending` variable. If the JS bundle is reloaded (fast-refresh during development, or OS-level app eviction while on the loading screen), `getPendingUpload()` returns `null` and `useAnalysis` immediately calls `router.back()`, silently aborting the analysis.
- Safe modification: Replace with a Zustand store with `persist` + AsyncStorage, matching the pattern used by `authStore` and `historyStore`.

**`currentAnalysis` Zustand state is the sole source of truth for the report screen:**
- Files: `stores/analysisStore.ts`, `app/report/[id].tsx` lines 22–29
- Why fragile: The report screen has no persistence. Navigating away and back (or backgrounding) clears `currentAnalysis` and causes an immediate redirect. The history store has durable data but is never consulted by the report screen.
- Safe modification: Always hydrate the report screen from history by id when `currentAnalysis` is null.

**`useAnalysis` `useEffect` has a missing dependency array entry:**
- Files: `hooks/useAnalysis.ts` lines 19–37
- Why fragile: The `useEffect` captures `toast` from `useToastContext()` but the dependency array is `[]`. The exhaustive-deps lint rule would flag this.
- Safe modification: Add `toast` to the dependency array, or extract the async logic into a `useCallback` that lists its deps explicitly.

---

## Scaling Limits

**History stored entirely in AsyncStorage (unbounded):**
- Current capacity: AsyncStorage on React Native has a practical limit of ~6 MB per key on Android.
- Limit: `analyses` storage key accumulates every analysis result indefinitely. Each `AnalysisResult` can be several kilobytes of JSON. A power user with hundreds of analyses will hit storage limits silently, causing `JSON.parse` failures on restore.
- Scaling path: Enforce a maximum history length (e.g. 50 entries) in `addEntry`, or paginate/archive older entries to Supabase once auth is real.

---

## Dependencies at Risk

**`expo-file-system/legacy` — transitional shim:**
- Risk: The `/legacy` export of `expo-file-system` v19 is explicitly marked as a compatibility shim. It re-exports from `src/legacy`, a path that exists for backward compatibility during SDK migration.
- Impact: When the shim is removed in a future SDK version, `utils/pdf.ts` will fail to import at compile time, breaking all PDF reads.
- Migration plan: Adopt the new `FileSystem.File` / `readAsStringAsync` API from `expo-file-system/next` before upgrading Expo SDK beyond the current version.

---

## Missing Critical Features

**No real authentication flow:**
- Problem: There is no Supabase Auth integration, no session management, no token refresh, no logout that clears a server-side session. The app stores a locally fabricated user object.
- Blocks: Quota enforcement, per-user history sync, Google SSO, password reset, and any future paid-tier gating.

**Negotiation screen does not exist as a route:**
- Problem: `ROUTES.negotiation` in `constants/config.ts` line 59 points to `/negotiation`. No such file exists under `app/`. The `negotiateContract` function in `services/ai.ts` and the `handleNegotiate` edge function handler are implemented, but there is no screen to invoke them or display results. `NegotiationResult` type is fully defined in `types/index.ts`.
- Blocks: The negotiation feature is entirely unreachable from the UI.

**Salary trend chart is a placeholder:**
- Problem: `app/(tabs)/history.tsx` lines 103–118 renders a grey box with "Grafico in arrivo" where a salary trend chart should appear.
- Blocks: The history screen's primary value proposition is missing.

---

## Test Coverage Gaps

**Zero test files exist:**
- What's not tested: The entire codebase. No unit tests, no integration tests, no E2E tests. No test runner configuration file exists.
- Files: All of `hooks/`, `utils/`, `stores/`, `services/`, `supabase/functions/`
- Risk: Silent regressions in any of the bug-prone areas above would go undetected.
- Priority: High — particularly for `utils/pdf.ts` (`isFileTooLarge` semantic bug), `stores/authStore.ts` (`canAnalyze` logic, missing month-reset), and `supabase/functions/analyze-contract/` (validate + analyze handler integration).
- First targets: `isFileTooLarge` (one-line fix verifiable with a unit test), `canAnalyze` month-reset logic, and `validateAnalyzeRequest` integration in `handleAnalyze`.

---

*Concerns audit: 2026-05-19*
