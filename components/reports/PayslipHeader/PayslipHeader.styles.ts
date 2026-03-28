import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing[5],
      gap: theme.spacing[4],
      ...theme.shadow.sm,
    },
    ccnl: {
      ...theme.typography.labelSm,
      color: theme.colors.muted,
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing[4],
    },
    column: {
      flex: 1,
      gap: theme.spacing[1],
    },
    divider: {
      width: 1,
      backgroundColor: theme.colors.border,
    },
    caption: {
      ...theme.typography.caption,
      color: theme.colors.muted,
    },
    grossAmount: {
      ...theme.typography.h2,
      color: theme.colors.foreground,
    },
    netAmount: {
      ...theme.typography.h2,
      color: theme.colors.primary,
    },
  })
