import { useMountEffect } from '@/hooks/useMountEffect'
import { useTheme } from '@/hooks/useTheme'
import { X } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { DEFAULT_DURATION, getToastConfig } from './Toast.config'
import { createStyles } from './Toast.styles'
import { ToastContainerProps, ToastProps } from './Toast.types'

function Toast({
  id,
  type,
  message,
  duration = DEFAULT_DURATION,
  onHide,
}: ToastProps) {
  const theme = useTheme()
  const styles = createStyles(theme)
  const config = getToastConfig(type, theme.colors)
  const Icon = config.icon

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-20)

  const hide = () => onHide(id)

  useMountEffect(() => {
    opacity.value = withTiming(1, { duration: 250 })
    translateY.value = withSpring(0, { damping: 15 })

    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 250 })
      translateY.value = withTiming(-20, { duration: 250 })
      setTimeout(() => runOnJS(hide)(), 260)
    }, duration)
  })

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View style={animStyle}>
      <View
        style={[
          styles.toast,
          {
            backgroundColor: config.backgroundColor,
            borderColor: config.borderColor,
          },
        ]}
      >
        <Icon size={18} color={config.iconColor} strokeWidth={2} />
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={hide} hitSlop={8}>
          <X size={16} color={theme.colors.muted} strokeWidth={2} />
        </Pressable>
      </View>
    </Animated.View>
  )
}

export function ToastContainer({ toasts, onHide }: ToastContainerProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  if (toasts.length === 0) return null

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onHide={onHide} />
      ))}
    </View>
  )
}
