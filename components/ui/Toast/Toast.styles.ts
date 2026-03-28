import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 60,
      left: 16,
      right: 16,
      zIndex: 9999,
      gap: theme.spacing[2],
    },
    toast: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[3],
      borderWidth: 1,
      borderRadius: theme.radius.xl,
      padding: theme.spacing[4],
      ...theme.shadow.md,
    },
    message: {
      ...theme.typography.bodySm,
      color: theme.colors.foreground,
      flex: 1,
    },
  })
