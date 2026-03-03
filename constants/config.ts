// ── App info ─────────────────────────────

export const APP = {
  name: 'PrimoContratto',
  version: '1.0.0',
  description: 'Analisi AI gratuita dei contratti di lavoro',
  supportEmail: 'support@primocontratto.it',
} as const

export const API = {
  openAiModel: 'gpt-4o-mini',
  openAiMaxTokens: 1500,

  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',

  aiTimeout: 30_000,
} as const

export const PLAN = {
  free: {
    maxAnalysesPerMonth: 3,
    label: 'Gratuito',
  },
  pro: {
    maxAnalysesPerMonth: Infinity,
    monthlyPrice: 3.99,
    yearlyPrice: 29.99,
    label: 'Pro',
  },
} as const

export const UPLOAD = {
  maxFileSizeMb: 10,
  maxFileSizeBytes: 10 * 1024 * 1024,
  acceptedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  acceptedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
} as const

export const ANALYSIS = {
  steps: [
    { key: 'receiving', label: 'Documento ricevuto', duration: 2000 },
    { key: 'reading', label: 'Clausole analizzate', duration: 3500 },
    { key: 'ccnl', label: 'CCNL verificato', duration: 3000 },
    { key: 'report', label: 'Report pronto', duration: 2500 },
  ],
  totalDuration: 11_000,
} as const

export const STORAGE_KEYS = {
  analyses: 'primocontratto:analyses',
  user: 'primocontratto:user',
  onboardingDone: 'primocontratto:onboarding_done',
  lastSyncAt: 'primocontratto:last_sync',
} as const

export const ROUTES = {
  home: '/',
  report: '/report',
  negotiation: '/negotiation',
  history: '/history',
  settings: '/settings',
} as const
