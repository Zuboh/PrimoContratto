import { Theme, ThemeContext } from '@/contexts/ThemeContext'
import { useContext } from 'react'

export function useTheme(): Theme {
  return useContext(ThemeContext)
}
