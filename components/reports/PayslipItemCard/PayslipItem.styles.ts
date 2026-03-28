import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.xl,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing[4],
      gap: theme.spacing[3],
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      flexShrink: 0,
    },
    textContainer: {
      flex: 1,
      gap: theme.spacing[1],
    },
    label: {
      ...theme.typography.label,
      color: theme.colors.foreground,
    },
    value: {
      ...theme.typography.caption,
      color: theme.colors.muted,
    },
    detail: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: theme.spacing[4],
    },
    detailText: {
      ...theme.typography.bodySm,
      color: theme.colors.foreground,
      lineHeight: 20,
    },
  })
