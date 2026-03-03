import { useTheme } from '@/contexts/ThemeContext'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { createCardStyles } from './Card.styles'
import { CardProps } from './Card.types'
import { CardSkeleton } from './CardSkeleton'

export function Card({
  children,
  variant = 'default',
  style,
  loading = false,
}: CardProps) {
  const theme = useTheme()

  const styles = useMemo(() => createCardStyles(theme), [theme])

  if (loading) return <CardSkeleton />

  return <View style={[styles.base, styles[variant], style]}>{children}</View>
}
