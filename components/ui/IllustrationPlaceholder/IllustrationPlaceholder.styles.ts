import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

const SIZES = { sm: 80, md: 140, lg: 200 } as const

export const createStyles = (theme: Theme, size: 'sm' | 'md' | 'lg') => {
  const dim = SIZES[size]
  return StyleSheet.create({
    container: {
      width: dim,
      height: dim,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    emoji: {
      fontSize: dim * 0.4,
    },
  })
}
