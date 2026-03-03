import React, { useEffect } from 'react'
import { View, ViewStyle } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../../contexts/ThemeContext'

interface SkeletonProps {
  width: number | `${number}%`
  height: number
  borderRadius?: number
  style?: ViewStyle
}

export function Skeleton({
  width,
  height,
  borderRadius,
  style,
}: SkeletonProps) {
  const { colors, radius } = useTheme()
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration: 800 }), -1, true)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const staticStyle: ViewStyle = {
    width,
    height,
    borderRadius: borderRadius ?? radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  }

  return <Animated.View style={[staticStyle, animatedStyle, style]} />
}

export function SkeletonRow({
  children,
  gap = 8,
}: {
  children: React.ReactNode
  gap?: number
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap }}>
      {children}
    </View>
  )
}
