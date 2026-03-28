import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { STEPS } from './GuideCard.config'
import { createStyles } from './GuideCard.styles'
import { GuideCardProps, StepRowProps } from './GuideCard.types'

export function GuideCard({ style }: GuideCardProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.sectionLabel}>Come funziona</Text>
      <View style={styles.stepsContainer}>
        {STEPS.map((step) => (
          <StepRow key={step.number} {...step} />
        ))}
      </View>
    </View>
  )
}

function StepRow({ number, text }: StepRowProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.stepRow}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  )
}
