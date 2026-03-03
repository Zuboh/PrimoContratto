import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createButtonStyles = (
  theme: Theme,
  fullWidth: boolean,
  disabled: boolean,
) => {
  const { colors, typography, radius, shadow, spacing } = theme

  return StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      borderRadius: radius.lg,
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.5 : 1,
    },
    primary: {
      backgroundColor: colors.primary,
      ...shadow.button,
    },
    secondary: {
      backgroundColor: colors.background,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: colors.transparent,
    },
    labelPrimary: {
      ...typography.label,
      color: colors.primaryForeground,
    },
    labelSecondary: {
      ...typography.label,
      color: colors.primary,
    },
    labelGhost: {
      ...typography.label,
      color: colors.muted,
      textDecorationLine: 'underline',
    },
  })
}
