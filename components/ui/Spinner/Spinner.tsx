import { useMountEffect } from '@/hooks/useMountEffect'
import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { View } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'

export interface SpinnerProps {
  size?: number
  color?: string
}

export function Spinner({ size = 16, color }: SpinnerProps) {
  const { colors } = useTheme()
  const rotation = useSharedValue(0)

  useMountEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
    )
  })

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[{ width: size, height: size }, animStyle]}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: color ?? colors.primary,
          borderTopColor: 'transparent',
        }}
      />
    </Animated.View>
  )
}
