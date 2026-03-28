import { useTheme } from '@/hooks/useTheme'
import { AlertTriangle } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './MissingClauseCard.styles'
import { MissingClausesCardProps } from './MissingClauseCard.types'

export function MissingClausesCard({
  clauses,
  style,
}: MissingClausesCardProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AlertTriangle size={16} color={theme.colors.warning} strokeWidth={2} />
        <Text style={styles.headerLabel}>Clausole mancanti o vaghe</Text>
      </View>

      {clauses.map((clause, index) => (
        <React.Fragment key={clause.id}>
          {index > 0 && <View style={styles.divider} />}
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{clause.title}</Text>
            <Text style={styles.itemDescription}>{clause.description}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  )
}
