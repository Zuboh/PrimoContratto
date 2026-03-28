import * as Haptics from 'expo-haptics'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

import { useTheme } from '@/hooks/useTheme'
import { createStyles } from './Toggle.styles'
import { ToggleProps } from './Toggle.types'

export function Toggle({
  value,
  onToggle,
  disabled = false,
  style,
}: ToggleProps) {
  const theme = useTheme()
  const styles = createStyles(theme, value)

  const translateX = useSharedValue(value ? 20 : 0)

  useEffect(() => {
    translateX.value = withTiming(value ? 20 : 0, { duration: 200 })
  }, [translateX, value])

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const handlePress = () => {
    if (disabled) return
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onToggle()
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.track, { opacity: disabled ? 0.5 : 1 }, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View style={[styles.thumb, thumbStyle]} />
    </Pressable>
  )
}
