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

    // Status variants
    warning: {
      backgroundColor: colors.warningLight,
    },

    success: {
      backgroundColor: colors.successLight,
    },

    error: {
      backgroundColor: colors.destructiveLight,
    },
  })
}
