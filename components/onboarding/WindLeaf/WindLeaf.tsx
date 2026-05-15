import React, { useEffect } from 'react'
import { Dimensions, Image } from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const { width: W, height: H } = Dimensions.get('window')

// Starting position — leaf on "i" in Primo wordmark (slide 1)
const START_X = W * 0.51
const START_Y = H * 0.185

// Rest position — slide 2 (near ShieldCheck icon area, top-right)
const REST_2_X = W * 0.78
const REST_2_Y = H * 0.17

// Rest position — slide 3 (near Leaf icon area)
const REST_3_X = W * 0.72
const REST_3_Y = H * 0.15

export type LeafPhase =
  | 'hidden'
  | 'flying-2'
  | 'resting-2'
  | 'flying-3'
  | 'resting-3'
  | 'done'

interface WindLeafProps {
  phase: LeafPhase
  onLanded?: () => void
}

export function WindLeaf({ phase, onLanded }: WindLeafProps) {
  const posX = useSharedValue(START_X)
  const posY = useSharedValue(START_Y)
  const rotate = useSharedValue(0)
  const opacity = useSharedValue(0)
  const scale = useSharedValue(1)

  useEffect(() => {
    switch (phase) {
      case 'hidden':
        cancelAnimation(posX)
        cancelAnimation(posY)
        cancelAnimation(rotate)
        cancelAnimation(opacity)
        cancelAnimation(scale)
        opacity.value = 0
        posX.value = START_X
        posY.value = START_Y
        rotate.value = 0
        scale.value = 1
        break

      case 'flying-2':
        // Reset to start position, then fly to slide 2 rest spot
        posX.value = START_X
        posY.value = START_Y
        opacity.value = 0
        rotate.value = 0
        scale.value = 1

        opacity.value = withTiming(1, { duration: 150 })

        posX.value = withTiming(REST_2_X, {
          duration: 1800,
          easing: Easing.out(Easing.ease),
        })

        // Arc up slightly then land
        posY.value = withSequence(
          withTiming(START_Y - 28, { duration: 600, easing: Easing.out(Easing.ease) }),
          withTiming(REST_2_Y, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        )

        // One full rotation
        rotate.value = withTiming(360, { duration: 1800, easing: Easing.linear })

        setTimeout(() => onLanded?.(), 1880)
        break

      case 'resting-2':
      case 'resting-3': {
        const restY = phase === 'resting-2' ? REST_2_Y : REST_3_Y
        cancelAnimation(posX)
        cancelAnimation(posY)
        cancelAnimation(rotate)

        // Gentle hover bob — DS "breath" timing 2400ms
        posY.value = withRepeat(
          withSequence(
            withTiming(restY - 4, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
            withTiming(restY, { duration: 1200, easing: Easing.inOut(Easing.sin) }),
          ),
          -1,
          false,
        )

        // Gentle rotation sway
        rotate.value = withRepeat(
          withSequence(
            withTiming(6, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
            withTiming(-6, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          true,
        )
        break
      }

      case 'flying-3': {
        cancelAnimation(posX)
        cancelAnimation(posY)
        cancelAnimation(rotate)

        const currentRotate = rotate.value
        posX.value = withTiming(REST_3_X, { duration: 1600, easing: Easing.out(Easing.ease) })
        posY.value = withTiming(REST_3_Y, { duration: 1600, easing: Easing.inOut(Easing.ease) })
        rotate.value = withTiming(currentRotate + 360, { duration: 1600, easing: Easing.linear })

        setTimeout(() => onLanded?.(), 1660)
        break
      }

      case 'done':
        cancelAnimation(posX)
        cancelAnimation(posY)
        cancelAnimation(rotate)
        opacity.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) })
        scale.value = withTiming(0.4, { duration: 400, easing: Easing.in(Easing.ease) })
        break
    }
  }, [phase])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: posX.value },
      { translateY: posY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }))

  if (phase === 'hidden') return null

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
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
