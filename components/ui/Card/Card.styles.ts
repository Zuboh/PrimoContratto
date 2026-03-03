import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createCardStyles = (theme: Theme) => {
  const { colors, radius, shadow, spacing } = theme

  return StyleSheet.create({
    base: {
      borderRadius: radius.lg,
      padding: spacing[4],
      ...shadow.sm,
    },
    default: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    surface: {
      backgroundColor: colors.surface,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    warning: {
      backgroundColor: colors.warningLight,
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
    },
    success: {
      backgroundColor: colors.successLight,
      borderLeftWidth: 4,
      borderLeftColor: colors.success,
    },
    error: {
      backgroundColor: colors.destructiveLight,
      borderLeftWidth: 4,
      borderLeftColor: colors.destructive,
    },
  })
}
