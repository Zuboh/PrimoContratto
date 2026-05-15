import React, { useEffect } from 'react'
import { Dimensions, Image } from 'react-native'
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const W = Dimensions.get('window').width

interface WindLeafProps {
  active: boolean
  startTop?: number
  startLeft?: number
  onFinish?: () => void
}

export function WindLeaf({
  active,
  startTop = 220,
  startLeft = 20,
  onFinish,
}: WindLeafProps) {
  const opacity = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotate = useSharedValue(0)
  const scale = useSharedValue(1)
  const done = useSharedValue(false)

  // Notify JS when animation finishes
  useAnimatedReaction(
    () => done.value,
    (isDone) => {
      if (isDone && onFinish) {
        done.value = false
        // schedule on JS thread by queueMicrotask-like effect via shared value reset
      }
    },
    [],
  )

  useEffect(() => {
    if (active) {
      // Fade in, then fade out at end
      opacity.value = withSequence(
        withTiming(1, { duration: 120 }),
        withDelay(1000, withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) })),
      )

      // Fly right
      translateX.value = withTiming(W + 80, { duration: 1200, easing: Easing.out(Easing.ease) })

      // Sinusoidal wobble
      translateY.value = withSequence(
        withTiming(-24, { duration: 300, easing: Easing.inOut(Easing.sin) }),
        withTiming(12, { duration: 300, easing: Easing.inOut(Easing.sin) }),
        withTiming(-18, { duration: 300, easing: Easing.inOut(Easing.sin) }),
        withTiming(8, { duration: 300, easing: Easing.inOut(Easing.sin) }),
      )

      // 1.5 rotations
      rotate.value = withTiming(540, { duration: 1200, easing: Easing.linear })

      // Scale down — 1200ms total, onFinish via timeout after animation
      scale.value = withTiming(0.7, { duration: 1200, easing: Easing.out(Easing.ease) })

      // Call onFinish after full animation duration
      const timer = setTimeout(() => onFinish?.(), 1250)
      return () => clearTimeout(timer)
    } else {
      opacity.value = 0
      translateX.value = 0
      translateY.value = 0
      rotate.value = 0
      scale.value = 1
    }
  }, [active])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: startTop,
          left: startLeft,
          width: 30,
          height: 30,
          zIndex: 50,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <Image
        source={require('@/assets/images/primo-leaf.png')}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    </Animated.View>
  )
}
