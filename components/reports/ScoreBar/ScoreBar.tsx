import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './ScoreBar.styles'
import { ScoreBarProps } from './ScoreBar.types'
import { buildScoreData } from './ScoreBar.utils'

export function ScoreBar({ analysis, style }: ScoreBarProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  const data = buildScoreData(analysis)
  if (!data) return null

  const { total, greenPct, yellowPct, redPct, legend } = data

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Riepilogo analisi</Text>
        <Text style={styles.total}>{total} voci analizzate</Text>
      </View>

      <View style={styles.barContainer}>
        {greenPct > 0 && (
          <View
            style={[
              styles.barSegment,
              { flex: greenPct, backgroundColor: legend[0]?.color },
            ]}
          />
        )}
        {yellowPct > 0 && (
          <View
            style={[
              styles.barSegment,
              {
                flex: yellowPct,
                backgroundColor: legend.find((l) => l.label === 'Da verificare')
                  ?.color,
              },
            ]}
          />
        )}
        {redPct > 0 && (
          <View
            style={[
              styles.barSegment,
              {
                flex: redPct,
                backgroundColor: legend.find((l) => l.label === 'Criticità')
                  ?.color,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.legend}>
        {legend.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={[styles.legendCount, { color: item.color }]}>
              {item.count}
            </Text>
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
