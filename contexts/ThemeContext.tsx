import { colors } from '@/constants/colors'
import { layout, radius, shadow, spacing } from '@/constants/spacing'
import {
  fontFamily,
  fontSize,
  lineHeight,
  typography,
} from '@/constants/typography'
import { useThemeStore } from '@/stores/themeStore'
import { createContext, useMemo } from 'react'

const lightColors = {
  ...colors,
  background: colors.background,
  surface: colors.surface,
  foreground: colors.foreground,
  muted: colors.muted,
  border: colors.border,
  borderStrong: colors.borderStrong,
  primary: colors.primary,
}

const darkColors = {
  ...colors,
  background: colors.dark.background,
  surface: colors.dark.surface,
  foreground: colors.dark.foreground,
  muted: colors.dark.muted,
  border: colors.dark.border,
  borderStrong: colors.dark.border,
  primary: colors.dark.primary,
  primaryLight: colors.dark.primaryLight,
  success: colors.dark.success,
  successLight: colors.dark.successLight,
  successBorder: colors.dark.successBorder,
  warning: colors.dark.warning,
  warningLight: colors.dark.warningLight,
  warningBorder: colors.dark.warningBorder,
  destructive: colors.dark.destructive,
  destructiveLight: colors.dark.destructiveLight,
  destructiveBorder: colors.dark.destructiveBorder,
}

function buildTheme(isDark: boolean) {
  return {
    colors: isDark ? darkColors : lightColors,
    typography,
    fontFamily,
    fontSize,
    lineHeight,
    spacing,
    radius,
    shadow,
    layout,
    isDark,
  }
}

const defaultTheme = buildTheme(false)

export type Theme = typeof defaultTheme

export const ThemeContext = createContext<Theme>(defaultTheme)

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const isDark = useThemeStore((state) => state.isDark)
  const theme = useMemo(() => buildTheme(isDark), [isDark])
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
