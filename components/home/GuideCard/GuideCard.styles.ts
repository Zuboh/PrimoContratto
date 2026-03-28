import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing[5],
      ...theme.shadow.sm,
    },
    sectionLabel: {
      ...theme.typography.labelSm,
      color: theme.colors.primary,
      marginBottom: theme.spacing[3],
    },
    stepsContainer: {
      gap: theme.spacing[3],
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[3],
    },
    stepBadge: {
      width: 24,
      height: 24,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    stepBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.colors.primaryForeground,
    },
    stepText: {
      ...theme.typography.bodySm,
      color: theme.colors.foreground,
      flex: 1,
    },
  })
