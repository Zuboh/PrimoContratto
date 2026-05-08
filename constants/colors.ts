export const colors = {
  primary: '#0891B2',
  primaryDark: '#0E7490',
  primaryLight: '#CFFAFE',
  primaryForeground: '#FFFFFF',
  gradientStart: '#0E6481',
  gradientEnd: '#30A3A5',

  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceAlt: '#FFFFFF',

  foreground: '#0F172A',
  muted: '#64748B',
  placeholder: '#94A3B8',

  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  success: '#0B7B3E',
  successLight: '#ECFDF5',
  successBorder: '#A7F3D0',

  warning: '#C05B00',
  warningLight: '#FEF3E2',
  warningBorder: '#FCD34D',

  destructive: '#DC2626',
  destructiveLight: '#FEF2F2',
  destructiveBorder: '#FECACA',

  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',

  overlay: 'rgba(0,0,0,0.4)',
  shadowPrimary: 'rgba(8,145,178,0.15)',
  transparent: 'transparent',

  dark: {
    background: '#0A0F1E',
    surface: '#111827',
    card: '#1E293B',
    foreground: '#F1F5F9',
    muted: '#94A3B8',
    border: '#334155',
    primary: '#22D3EE',
    primaryLight: '#164E63',
    success: '#34D399',
    successLight: '#064E3B',
    successBorder: '#065F46',
    warning: '#FBBF24',
    warningLight: '#78350F',
    warningBorder: '#92400E',
    destructive: '#F87171',
    destructiveLight: '#7F1D1D',
    destructiveBorder: '#991B1B',
  },
} as const

export type ColorKey = keyof typeof colors

export const STATUS_COLORS: Record<'green' | 'yellow' | 'red', string> = {
  green: '#0B7B3E',
  yellow: '#C05B00',
  red: '#DC2626',
}
