import { useTheme } from '@/hooks/useTheme'
import { XCircle } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './AnomaliesCard.styles'
import { AnomaliesCardProps } from './AnomaliesCard.types'

export function AnomaliesCard({ anomalies, style }: AnomaliesCardProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <XCircle size={16} color={theme.colors.destructive} strokeWidth={2} />
        <Text style={styles.headerLabel}>Anomalie rilevate</Text>
      </View>

      {anomalies.map((anomaly, index) => (
        <React.Fragment key={anomaly.id}>
          {index > 0 && <View style={styles.divider} />}
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{anomaly.title}</Text>
            <Text style={styles.itemDescription}>{anomaly.description}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  )
}
