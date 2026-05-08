import { useTheme } from '@/hooks/useTheme'
import { LucideIcon } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ label, value, icon: Icon, iconColor }: StatCardProps) {
  const theme = useTheme()
  const { colors, typography } = theme

  const iconCol = iconColor ?? colors.primary

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Icon size={16} color={iconCol} strokeWidth={2} style={styles.icon} />
      <Text style={[typography.h3, { color: colors.foreground, marginBottom: 2 }]}>
        {value}
      </Text>
      <Text style={[typography.caption, { color: colors.muted }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  icon: {
    marginBottom: 6,
  },
})
