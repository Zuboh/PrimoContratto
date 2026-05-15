import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.warningLight,
      borderRadius: theme.radius.lg,
      padding: theme.spacing[4],
      gap: theme.spacing[4],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
    },
    headerLabel: {
      ...theme.typography.labelSm,
      color: theme.colors.warning,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.warningBorder,
    },
    item: {
      gap: theme.spacing[1],
    },
    itemTitle: {
      ...theme.typography.label,
      color: theme.colors.foreground,
    },
    itemDescription: {
      ...theme.typography.caption,
      color: theme.colors.foreground,
      lineHeight: 18,
    },
  })
