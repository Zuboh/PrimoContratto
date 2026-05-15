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

// Primo Design System border radii
// xs=10 sm=14 md=18 lg=24 xl=28 pill=999
export const radius = {
  xs: 10,    // --r-xs: small components
  sm: 14,    // --r-sm: buttons, small cards
  md: 18,    // --r-md: groups, inputs
  lg: 24,    // --r-lg: card default
  xl: 28,    // --r-xl: hero card
  '2xl': 28, // alias → xl (compat)
  full: 9999, // --r-pill
} as const

export const shadow = {
  // --shadow-card: soft card glow (sage)
  sm: {
    shadowColor: '#3F5A45',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,

  // --shadow-pop light (warm brown rgba(80,60,30))
  md: {
    shadowColor: '#50381E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 5,
  } as ViewStyle,

  // --shadow-pop heavy (warm brown rgba(80,60,30,0.12))
  lg: {
    shadowColor: '#50381E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 10,
  } as ViewStyle,

  // button shadow (sage)
  button: {
    shadowColor: '#3F5A45',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  // --shadow-fab (sage rgba(63,90,69,0.28))
  fab: {
    shadowColor: '#3F5A45',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 12,
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
