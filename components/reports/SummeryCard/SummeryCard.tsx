import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './SummeryCard.styles'
import { SummaryCardProps } from './SummeryCard.types'

export function SummaryCard({ summary, style }: SummaryCardProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Riepilogo AI</Text>
      <Text style={styles.text}>{summary}</Text>
    </View>
  )
}
