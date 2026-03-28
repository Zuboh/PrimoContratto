import { colors } from '@/constants/colors'
import { layout, radius, shadow, spacing } from '@/constants/spacing'
import {
  fontFamily,
  fontSize,
  lineHeight,
  typography,
} from '@/constants/typography'
import { createContext } from 'react'

const theme = {
  colors,
  typography,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
  radius,
  shadow,
  layout,
} as const

export type Theme = typeof theme

export const ThemeContext = createContext<Theme>(theme)

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
