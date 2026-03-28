import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './TrustPills.styles'
import { TrustPillProps } from './TrustPills.types'

export default function TrustPill({ icon: Icon, label }: TrustPillProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.pill}>
      <Icon size={14} color={theme.colors.primary} strokeWidth={2} />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
