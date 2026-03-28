import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FEF3E2',
      borderRadius: theme.radius.xl,
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
      backgroundColor: '#F5D9A8',
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
