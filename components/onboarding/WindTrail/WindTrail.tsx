import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const W = Dimensions.get('window').width

interface WindTrailProps {
  active: boolean
  startTop?: number
  startLeft?: number
}

export function WindTrail({
  active,
  startTop = 220,
  startLeft = 20,
}: WindTrailProps) {
  const opacity = useSharedValue(0)
  const translateX = useSharedValue(0)

  useEffect(() => {
    if (active) {
      opacity.value = withSequence(
        withTiming(1, { duration: 120 }),
        withDelay(1400, withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) })),
      )
      translateX.value = withTiming(W + 100, {
        duration: 1800,
        easing: Easing.out(Easing.ease),
      })
    } else {
      opacity.value = 0
      translateX.value = 0
    }
  }, [active])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: startTop + 6,
          left: startLeft - 70,
          width: 160,
          height: 48,
          zIndex: 49,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <Svg width={160} height={48}>
        {/* Single tight S-curl wind trail */}
        <Path
          d="M 0,18 C 18,-22 52,36 88,4 C 108,-18 128,14 148,8"
          stroke="#4F6B4A"
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
          opacity={0.30}
        />
      </Svg>
    </Animated.View>
  )
}
