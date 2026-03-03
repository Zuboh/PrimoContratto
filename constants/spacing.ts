import { ViewStyle } from 'react-native'

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const

export const shadow = {
  sm: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  md: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  } as ViewStyle,

  lg: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  } as ViewStyle,

  button: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,
} as const

export const layout = {
  screenPaddingH: spacing[6],
  screenPaddingV: spacing[4],
  cardPadding: spacing[4],
  sectionGap: spacing[5],
  itemGap: spacing[3],
  bottomNavHeight: 64,
} as const

export type SpacingKey = keyof typeof spacing
export type RadiusKey = keyof typeof radius
export type ShadowKey = keyof typeof shadow
