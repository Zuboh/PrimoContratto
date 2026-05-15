import { TextStyle } from 'react-native'

export const fontFamily = {
  regular: 'Nunito_400Regular',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  numericRegular: 'Inter_400Regular',
  numericBold: 'Inter_700Bold',
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
  '4xl': 22,   // h2
  '5xl': 30,   // h1
  '6xl': 38,   // number
  '7xl': 40,   // display
} as const

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
  loose: 1.8,
} as const

export const typography = {
  // ── Display ─────────────────────────────────
  display: {
    fontSize: 40,
    fontFamily: fontFamily.extraBold,
    letterSpacing: -0.8,
    lineHeight: 48,
  } as TextStyle,

  // ── Headings ────────────────────────────────
  h1: {
    fontSize: 30,
    fontFamily: fontFamily.extraBold,
    letterSpacing: -0.45,
    lineHeight: 36,
  } as TextStyle,

  h2: {
    fontSize: 22,
    fontFamily: fontFamily.extraBold,
    letterSpacing: -0.22,
    lineHeight: 28,
  } as TextStyle,

  h3: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
  } as TextStyle,

  h4: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 22,
  } as TextStyle,

  // ── Body ────────────────────────────────────
  body: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    lineHeight: 24,
  } as TextStyle,

  bodyLg: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    lineHeight: 24,
  } as TextStyle,

  body2: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 20,
  } as TextStyle,

  bodySm: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 20,
  } as TextStyle,

  // ── Labels ──────────────────────────────────
  label: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    lineHeight: 22,
  } as TextStyle,

  labelSm: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    lineHeight: 20,
  } as TextStyle,

  // ── Caption ─────────────────────────────────
  // Design System: 12px / 700 / uppercase / ls 0.18em
  caption: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    letterSpacing: 2.16,
    textTransform: 'uppercase',
    lineHeight: 16,
  } as TextStyle,

  captionBold: {
    fontSize: 12,
    fontFamily: fontFamily.extraBold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    lineHeight: 16,
  } as TextStyle,

  overline: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  } as TextStyle,

  // ── Numeric (Inter) ─────────────────────────
  // Design System: 38px / 800 / ls -0.02em
  number: {
    fontSize: 38,
    fontFamily: fontFamily.numericBold,
    letterSpacing: -0.76,
    lineHeight: 44,
  } as TextStyle,

  numberSm: {
    fontSize: 24,
    fontFamily: fontFamily.numericBold,
    letterSpacing: -0.48,
    lineHeight: 30,
  } as TextStyle,

  // ── Brand ───────────────────────────────────
  brand: {
    fontSize: 26,
    fontFamily: fontFamily.extraBold,
    letterSpacing: -0.26,
  } as TextStyle,
} as const

export type TypographyKey = keyof typeof typography
