# PrimoContratto — System Prompt Agente

## 🎯 Chi sono e cosa stiamo costruendo

Sto sviluppando **PrimoContratto**, un'app mobile React Native per l'analisi automatica di contratti di lavoro italiani tramite AI. Target: giovani lavoratori italiani alla prima esperienza.

Prima di rispondermi, **leggi sempre la struttura del progetto** esplorando le cartelle `constants/`, `components/`, `types/`, `contexts/` così capisci il contesto reale.

---

## 🤖 Come devi comportarti

- Rispondimi sempre in **italiano**
- Sii **diretto e conciso** — no spiegazioni inutili
- **Leggi i file esistenti** prima di scrivere nuovo codice — non assumere nulla
- Se hai dubbi, **chiedimi prima** di procedere
- Se vedi errori TypeScript, **correggili subito**
- Preferisci **soluzioni semplici** a soluzioni complesse
- Non aggiungere librerie senza **chiedermi prima**
- I commenti nel codice vanno in **italiano**
- Per task complessi, mostrami prima un **piano in 3-5 punti**

---

## 🛠️ Stack

- **React Native + Expo SDK 52**
- **Expo Router v3** — navigazione file-based
- **TypeScript strict**
- **Zustand** — state management
- **Supabase** — backend, auth, database
- **OpenAI GPT-4o mini** — analisi AI contratti
- **react-native-reanimated v3** — animazioni
- **react-native-svg** — icone SVG
- **lucide-react-native** — icone UI

---

## 📁 Struttura cartelle

```
app/               → schermate (Expo Router)
components/ui/     → componenti base con pattern cartella
components/analysis/ → componenti specifici app
constants/         → colors, typography, spacing, config
contexts/          → ThemeContext
hooks/             → logica riutilizzabile
services/          → AI, Supabase, storage
stores/            → Zustand stores
types/             → tutti i tipi TypeScript
```

---

## 🧩 Pattern componenti UI — SEMPRE

```
components/ui/NomeComponente/
├── NomeComponente.types.ts
├── NomeComponente.styles.ts
├── NomeComponenteSkeleton.tsx
├── NomeComponente.tsx
└── index.ts
```

**Regole ferree:**

- Import SEMPRE da `index.ts`, mai dal file diretto
- Prop `loading?: boolean` su ogni componente — mostra skeleton se true
- MAI hardcodare colori o spacing — usa `useTheme()`
- Stili sempre con `createStyles(theme)`

---

## 🎨 Design system

```typescript
// Colori — da constants/colors.ts
colors.primary       // #0891B2 turchese
colors.surface       // #F0FDFF sfondo tenue
colors.foreground    // #0F172A testo
colors.muted         // #64748B testo secondario
colors.border        // #E0F7FA bordi
colors.success       // #0B7B3E verde
colors.warning       // #C05B00 arancione
colors.destructive   // #DC2626 rosso

// Spacing — da constants/spacing.ts
spacing[1]=4  spacing[2]=8  spacing[3]=12
spacing[4]=16 spacing[5]=20 spacing[6]=24

// Radius
radius.sm=8  radius.md=12  radius.lg=16  radius.full=9999
```

---

## 📐 Tipi TypeScript principali

```typescript
// da types/index.ts
ClauseStatus     → 'green' | 'yellow' | 'red'
GlobalStatus     → 'positive' | 'warning' | 'critical'
ContractType     → 'Tempo Determinato' | 'Tempo Indeterminato' | 'Stage' | ...
UploadStep       → 'idle' | 'receiving' | 'reading' | 'checking_ccnl' | 'preparing' | 'done' | 'error'
Plan             → 'free' | 'pro'
ButtonVariant    → 'primary' | 'secondary' | 'ghost'
BadgeVariant     → 'default' | 'success' | 'warning' | 'error'
```

---

## ⚠️ Regole importanti

1. **Non modificare** `constants/colors.ts`, `constants/typography.ts`, `constants/spacing.ts` senza chiedermi
2. **Non cambiare** il ThemeContext
3. I file `playground.tsx` e `index.tsx` (WIP screen) sono temporanei
4. Il playground è visibile **solo in `__DEV__`**
5. Ogni schermata usa `useTheme()` per tutti gli stili
