export const colors = {
  // Sage (primary brand)
  primary: '#4F7942',
  primaryDark: '#3A5C30',
  primaryLight: '#D4E8CF',
  primaryForeground: '#FFFFFF',
  gradientStart: '#4F7942',
  gradientEnd: '#6B9663',

  // Cream backgrounds
  background: '#FFFBF5',
  surface: '#FFF5E8',
  surfaceAlt: '#FAF0E2',

  // Warm text
  foreground: '#2B1F0E',
  muted: '#8C7358',
  placeholder: '#B09575',

  // Warm borders
  border: '#EDE3D5',
  borderStrong: '#D4C4B0',

  // Status
  success: '#2E7D32',
  successLight: '#F1F8E9',
  successBorder: '#A5D6A7',

  warning: '#E65100',
  warningLight: '#FFF3E0',
  warningBorder: '#FFCC80',

  destructive: '#C62828',
  destructiveLight: '#FFEBEE',
  destructiveBorder: '#EF9A9A',

  // Warm gray scale
  gray50: '#FAF5EE',
  gray100: '#F5EDE2',
  gray200: '#EAD9C8',
  gray300: '#D4C0A8',
  gray400: '#B89880',
  gray500: '#8C7358',
  gray600: '#6B5540',
  gray700: '#4F3E2C',
  gray800: '#362A1E',
  gray900: '#1E170F',

  overlay: 'rgba(43,31,14,0.4)',
  shadowPrimary: 'rgba(79,121,66,0.15)',
  transparent: 'transparent',
} as const

export type ColorKey = keyof typeof colors

export const STATUS_COLORS: Record<'green' | 'yellow' | 'red', string> = {
  green: '#2E7D32',
  yellow: '#E65100',
  red: '#C62828',
}
