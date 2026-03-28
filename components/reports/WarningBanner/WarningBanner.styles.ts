import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.lg,
      borderLeftWidth: 4,
      padding: theme.spacing[4],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[3],
    },
    text: {
      ...theme.typography.label,
      color: theme.colors.foreground,
      flex: 1,
    },
  })
