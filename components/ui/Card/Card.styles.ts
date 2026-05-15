import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createCardStyles = (theme: Theme) => {
  const { colors, radius, shadow, spacing } = theme

  return StyleSheet.create({
    base: {
      borderRadius: radius.lg,       // --r-lg: 24px
      padding: spacing[5],           // 20px (DS card-row uses s-6=24, we use 20 for mobile)
      backgroundColor: colors.surface,
      ...shadow.sm,
    },

    // Standard card — no border, just shadow
    default: {},

    // Hero card — larger radius, elevated shadow
    hero: {
      borderRadius: radius.xl,       // --r-xl: 28px
      padding: spacing[6],           // 24px
      ...shadow.md,
    },

    // Sage-tinted card (hints, status info)
    surface: {
      backgroundColor: colors.surface2,
    },

    // Status variants — left accent border
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
