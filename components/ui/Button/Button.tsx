import { useTheme } from '@/hooks/useTheme'
import React, { useMemo } from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { createButtonStyles } from './Button.styles'
import { ButtonProps } from './Button.types'

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  const theme = useTheme()

  const styles = useMemo(
    () => createButtonStyles(theme, fullWidth, disabled),
    [theme, fullWidth, disabled],
  )

  const labelStyle =
    variant === 'primary'
      ? styles.labelPrimary
      : variant === 'secondary'
        ? styles.labelSecondary
        : styles.labelGhost

  const spinnerColor =
    variant === 'primary'
      ? theme.colors.primaryForeground
      : theme.colors.primary

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}
