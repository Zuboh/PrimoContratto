import { Spinner } from '@/components/ui/Spinner'
import { useMountEffect } from '@/hooks/useMountEffect'
import { useTheme } from '@/hooks/useTheme'
import { Check } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { createStyles } from '../AnalysisChips.styles'
import { ChipProps } from '../AnalysisChips.types'

export function Chip({ label, state, index }: ChipProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(8)

  useMountEffect(() => {
    const delay = index * 80
    opacity.value = withDelay(delay, withTiming(1, { duration: 350 }))
    translateY.value = withDelay(delay, withTiming(0, { duration: 350 }))
  })

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const chipStyle =
    state === 'active'
      ? styles.chipActive
      : state === 'success'
        ? styles.chipSuccess
        : styles.chipDone

  const textStyle =
    state === 'active'
      ? styles.chipTextActive
      : state === 'success'
        ? styles.chipTextSuccess
        : styles.chipTextDone

  return (
    <Animated.View style={[styles.chip, chipStyle, animStyle]}>
      {state === 'active' ? (
        <Spinner color={theme.colors.primary} />
      ) : (
        <View
          style={[
            styles.checkBadge,
            state === 'success'
              ? styles.checkBadgeSuccess
              : styles.checkBadgePrimary,
          ]}
        >
          <Check size={10} color="#fff" strokeWidth={3} />
        </View>
      )}
      <Text style={textStyle}>{label}</Text>
    </Animated.View>
  )
}
