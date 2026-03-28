import { useTheme } from '@/hooks/useTheme'

import React from 'react'
import { View } from 'react-native'
import TrustPill from './TrustPill'
import { TRUST_PILLS } from './TrustPills.config'
import { createStyles } from './TrustPills.styles'
import { TrustPillsProps } from './TrustPills.types'

export function TrustPills({ style }: TrustPillsProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.row, style]}>
      {TRUST_PILLS.map(({ icon, label }) => (
        <TrustPill key={label} icon={icon} label={label} />
      ))}
    </View>
  )
}
