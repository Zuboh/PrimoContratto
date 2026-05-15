import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './IllustrationPlaceholder.styles'
import { IllustrationPlaceholderProps } from './IllustrationPlaceholder.types'

export function IllustrationPlaceholder({ size = 'md', style }: IllustrationPlaceholderProps) {
  const theme = useTheme()
  const styles = createStyles(theme, size)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>🐼</Text>
    </View>
  )
}
