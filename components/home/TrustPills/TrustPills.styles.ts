import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing[2],
      justifyContent: 'center',
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.full,
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
    },
    label: {
      ...theme.typography.labelSm,
      color: theme.colors.foreground,
    },
  })
