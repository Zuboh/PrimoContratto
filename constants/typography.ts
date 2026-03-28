import { TextStyle } from 'react-native'

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const

export const fontSize = {
  xs: 10,
  sm: 11,
  base: 12,
  md: 13,
  lg: 14,
  xl: 16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 24,
  '5xl': 26,
  '6xl': 32,
} as const

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
  loose: 1.8,
} as const

export const typography = {
  h1: {
    fontSize: fontSize['5xl'],
    fontFamily: fontFamily.bold,
    lineHeight: fontSize['5xl'] * lineHeight.tight,
  } as TextStyle,

  h2: {
    fontSize: fontSize['4xl'],
    fontFamily: fontFamily.bold,
    lineHeight: fontSize['3xl'] * lineHeight.tight,
  } as TextStyle,

  h3: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
    lineHeight: fontSize.xl * lineHeight.normal,
  } as TextStyle,

  h4: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    lineHeight: fontSize.lg * lineHeight.normal,
  } as TextStyle,

  bodyLg: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.lg * lineHeight.relaxed,
  } as TextStyle,

  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.base * lineHeight.relaxed,
  } as TextStyle,

  bodySm: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.md * lineHeight.relaxed,
  } as TextStyle,

  label: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semiBold,
    lineHeight: fontSize.lg * lineHeight.normal,
  } as TextStyle,

  labelSm: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.semiBold,
    lineHeight: fontSize.base * lineHeight.normal,
  } as TextStyle,

  caption: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.base * lineHeight.normal,
  } as TextStyle,

  captionBold: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.bold,
    lineHeight: fontSize.base * lineHeight.normal,
  } as TextStyle,

  overline: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  } as TextStyle,

  brand: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.bold,
  } as TextStyle,
} as const

export type TypographyKey = keyof typeof typography
