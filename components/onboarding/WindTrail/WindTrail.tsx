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
        withDelay(900, withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) })),
      )
      translateX.value = withTiming(W + 80, {
        duration: 1200,
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
          top: startTop + 4,
          left: startLeft - 60,
          width: 130,
          height: 40,
          zIndex: 49,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <Svg width={130} height={40}>
        {/* Wind trail curves — sage color, subtle */}
        <Path
          d="M 0,12 C 30,-5 70,20 120,8"
          stroke="#4F6B4A"
          strokeWidth={1.2}
          strokeLinecap="round"
          fill="none"
          opacity={0.22}
        />
        <Path
          d="M 0,20 C 25,5 65,28 115,16"
          stroke="#4F6B4A"
          strokeWidth={1.0}
          strokeLinecap="round"
          fill="none"
          opacity={0.16}
        />
        <Path
          d="M 0,4 C 20,-8 55,14 100,2"
          stroke="#4F6B4A"
          strokeWidth={0.9}
          strokeLinecap="round"
          fill="none"
          opacity={0.18}
        />
      </Svg>
    </Animated.View>
  )
}
