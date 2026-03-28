import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { ClauseCard } from '../ClauseCard/ClauseCard'
import { ClauseListProps } from './ClauseList.types'

export function ClauseList({ clauses }: ClauseListProps) {
  const { colors, typography, spacing } = useTheme()

  return (
    <View style={{ gap: spacing[3] }}>
      <Text style={[typography.label, { color: colors.foreground }]}>
        Analisi clausole
      </Text>
      {clauses.map((clause) => (
        <ClauseCard key={clause.id} {...clause} />
      ))}
    </View>
  )
}
