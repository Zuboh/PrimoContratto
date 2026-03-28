import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles, getVariantConfig } from './Badge.styles'
import { BadgeProps } from './Badge.types'
import { BadgeSkeleton } from './BadgeSkeleton'

export function Badge({
  label,
  variant = 'default',
  icon,
  style,
  loading = false,
}: BadgeProps) {
  const theme = useTheme()

  if (loading) return <BadgeSkeleton />

  const config = getVariantConfig(theme.colors)[variant]
  const styles = createStyles(theme, config.color)

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        style,
      ]}
    >
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
