export const colors = {
  primary: '#0891B2',
  primaryDark: '#0E7490',
  primaryLight: '#CFFAFE',
  primaryForeground: '#FFFFFF',

  background: '#FFFFFF',
  surface: '#F0FDFF',
  surfaceAlt: '#F8FAFC',

  foreground: '#0F172A',
  muted: '#64748B',
  placeholder: '#94A3B8',

  border: '#E0F7FA',
  borderStrong: '#BAE6FD',

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
} as const

export type ColorKey = keyof typeof colors
