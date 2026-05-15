# Primo — Task Tracker

## In Progress

- [ ] **Test redesign on device** — run `npx expo start`, scan QR, verify all screens render with warm palette

---

## Next Up

### Visual / Design
- [ ] **Swap panda illustrations** — replace `🐼` emoji placeholders in `IllustrationPlaceholder` with real SVG/PNG assets once available (home empty state, loading, report header, paywall, onboarding)
- [ ] **Paywall screen** — not yet implemented; design reference in `docs/design/screenshots/primo/paywall.png`
- [ ] **Notifiche screen** — notification list/sheet shown in `docs/design/screenshots/primo/profilo.png`

### Charts
- [ ] **Storico line chart** — add `victory-native` (or SVG-drawn chart) to `app/(tabs)/history.tsx`; replace placeholder container
- [ ] **Riepilogo donut chart** — net salary breakdown pie in `app/report/[id].tsx`

### Auth
- [ ] **Wire real Supabase auth** — `services/supabase.ts` is empty stub; implement `signIn`, `signUp`, `signOut` + update login/register screens to call real API instead of mock `setUser`
- [ ] **Auth gate** — redirect unauthenticated users to `/(auth)/login` from `app/_layout.tsx`; currently nothing blocks access to tabs without logging in
- [ ] **Persist session** — on app reopen, check existing Supabase session; skip onboarding + login if already authenticated
- [ ] **Google authentication** — implement "Continua con Google" button in login screen using Supabase OAuth + `expo-auth-session`; handle redirect back to app and session creation

### UX / Polish
- [ ] **Swipe between tabs** — add horizontal swipe gesture to switch between Panoramica / Storico / Profilo tabs; likely needs `ViewPager` or Tabs `tabBarScrollEnabled` + gesture handler
- [ ] **Bug: white flash register → login** — navigating back from register to login shows brief white page; likely `(auth)` Stack missing `backgroundColor` on screen container; check `app/(auth)/_layout.tsx` animation + background config
- [ ] **Smooth onboarding → login transition** — `router.replace('/(auth)/login')` from last onboarding slide should feel intentional; tune animation (e.g. `slide_from_bottom` or custom fade) in `app/_layout.tsx` or `app/(auth)/_layout.tsx`
- [ ] **Home contract entries** — home screen silently hides contract analyses (only shows payslips); decide UX for contract-only users
- [ ] **Profile screen** — settings currently minimal; add name/email/avatar display per `profilo.png`
- [ ] **Onboarding seen flag** — use AsyncStorage so onboarding only shows once

### Infra
- [ ] **Fix tsconfig** — `expo/tsconfig.base` not found error in `tsconfig.json`; causes TS language server noise

### Visual Fidelity — Screen by Screen
- [ ] **Panoramica** — match `docs/design/screenshots/primo/home.png` + `home_default.png`; salary card layout, status cards, greeting header
- [ ] **Storico** — match `docs/design/screenshots/primo/storico.png`; list entries, chart placeholder area, delta badges
- [ ] **Profilo** — match `docs/design/screenshots/primo/profilo.png`; user info section, settings rows, section grouping
- [ ] **Upload / Carica cedolino** — match `docs/design/screenshots/primo/upload.png`; two option cards, info rows, format hint
- [ ] **Loading / Analisi in corso** — match `docs/design/screenshots/primo/caricamento.png`; progress bar, step checklist, illustration slot
- [ ] **Riepilogo** — match `docs/design/screenshots/primo/riepilogo.png`; header card with panda slot, salary breakdown, action cards
- [ ] **Onboarding** — match `docs/design/screenshots/primo/onboarding.png`; 3 slides, illustration slots, dot pagination, CTA
- [ ] **Login** — match Design System §16.7; form card, fields with icons, 'Accedi' pill CTA, Google button
- [ ] **Register** — match Design System §16.7; form card, live password helper, terms checkbox, 'Registrati' CTA

### Design System Components to Build
- [ ] **TextField component** — label + icon + helper text + error state; Design System §16.1
- [ ] **BottomSheet component** — 5 variants (default, confirm, destructive, info, loading); Design System §14
- [ ] **EmptyState component** — IllustrationPlaceholder + title + body + CTA button; Design System §12
- [ ] **Checkbox + Radio** — form controls; Design System §16.4
- [ ] **FormField wrapper** — label + input + helper; Design System §16.5

### Cleanup
- [x] **Remove Negoziazione screen** — deleted `app/negotation/[id].tsx`, removed Stack.Screen and BottomNav pathname ref
- [x] **Remove unused files** — deleted GradientText, Toggle, HeroSection, TrustPills, storage.ts, useDebounce, useMinimumLoading, empty AanalysisChips.tsx
- [x] **Build playground screen** — web-only design system showcase at /playground
- [ ] **Replace app icon with final Primo branding** — placeholder "P" icon is temporary; replace with real designed icon (1024×1024 PNG) when brand assets are ready — turn `app/playground.tsx` into a full design system showcase with all UI components (Button variants, Card variants, Badge, IllustrationPlaceholder, Typography scale, colors)

---

## Done

- [x] **Implement remaining DS sections** — motion tokens, button spec, skeleton shimmer, BottomNav card style
- [x] **Align spacing/shadows/cards to Design System HTML** — shadow pop uses warm brown, fab opacity→0.28, Card adds hero variant (r-xl), base padding→20px, default drops border
- [x] **Align radius + shadow tokens to Design System HTML** — add xs=10, sm→14, md→18, fix shadow shadowColor to sage-900
- [x] **Align typography tokens to Design System HTML** — h1→30px/800, h2→22px/800, h3→18px, body→16px, caption→bold uppercase, add display+number styles
- [x] **Align color tokens to Design System HTML** — replace all colors in constants/colors.ts with exact values from Primo Design System.html (ink, sage scale, surface variants, warm status colors)
- [x] **Warm palette redesign** — `feat/redesign-warm-palette` branch; cream `#F5ECDC` bg, sage `#4F6B4A` primary, Nunito fonts, all screens restyled, auth screens, onboarding
