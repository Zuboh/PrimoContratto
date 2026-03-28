import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      padding: theme.spacing[4],
      gap: theme.spacing[2],
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    text: {
      fontSize: 13,
      color: theme.colors.foreground,
      lineHeight: 20,
    },
  })
