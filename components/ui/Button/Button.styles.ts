import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'
import { ButtonSize } from './Button.types'

export const createButtonStyles = (
  theme: Theme,
  fullWidth: boolean,
  disabled: boolean,
  size: ButtonSize = 'default',
) => {
  const { colors, radius, shadow } = theme
  const isSm = size === 'sm'

  return StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      // DS: large 14/22px · small 9/14px
      paddingVertical: isSm ? 9 : 14,
      paddingHorizontal: isSm ? 14 : 22,
      borderRadius: radius.full,         // pill
      width: fullWidth ? '100%' : undefined,
      opacity: disabled ? 0.5 : 1,
    },
    primary: {
      backgroundColor: colors.primary,  // sage-700
      ...shadow.button,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow.sm,
    },
    ghost: {
      backgroundColor: colors.transparent,
    },
    labelPrimary: {
      fontSize: isSm ? 13.5 : 16,
      fontFamily: 'Nunito_600SemiBold',
      color: colors.primaryForeground,   // #F8F4E6 warm white
    },
    labelSecondary: {
      fontSize: isSm ? 13.5 : 16,
      fontFamily: 'Nunito_600SemiBold',
      color: colors.foreground,
    },
    labelGhost: {
      fontSize: isSm ? 13.5 : 16,
      fontFamily: 'Nunito_600SemiBold',
      color: colors.primary,             // DS: ghost uses sage-700 text
    },
  })
}
