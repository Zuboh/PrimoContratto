import { useTheme } from '@/hooks/useTheme'
import { PayslipItem } from '@/types'
import React from 'react'
import { Text, View } from 'react-native'
import { PayslipItemCard } from '../PayslipItemCard/PayslipItemCard'

export function PayslipItems({ items }: { items: PayslipItem[] }) {
  const { colors, typography, spacing } = useTheme()

  return (
    <View style={{ gap: spacing[3] }}>
      <Text style={[typography.label, { color: colors.foreground }]}>
        Voci in dettaglio
      </Text>
      {items.map((item) => (
        <PayslipItemCard key={item.id} item={item} />
      ))}
    </View>
  )
}
