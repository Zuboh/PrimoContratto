import { useTheme } from '@/hooks/useTheme'
import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ToggleProps } from './Toggle.types'

// DS: 50×30px track, 24×24 thumb, thumb offset 3px, d-quick 160ms
const TRACK_W = 50
const TRACK_H = 30
const THUMB_SIZE = 24
const THUMB_OFFSET = 3
const THUMB_TRAVEL = TRACK_W - THUMB_SIZE - THUMB_OFFSET * 2  // = 20px

export function Toggle({ value, onToggle, disabled, label, description }: ToggleProps) {
  const { colors, spacing } = useTheme()
  const translateX = useSharedValue(value ? THUMB_TRAVEL : 0)

  useEffect(() => {
    translateX.value = withTiming(value ? THUMB_TRAVEL : 0, { duration: 160 })
  }, [value])

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const trackBg = disabled
    ? colors.surface3
    : value
    ? colors.primary   // sage-700
    : colors.surface3

  if (label || description) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[4] }}>
        <View style={{ flex: 1 }}>
          {label && (
            <Text style={{ fontSize: 15, fontFamily: 'Nunito_600SemiBold', color: colors.foreground }}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: 13, fontFamily: 'Nunito_400Regular', color: colors.muted, marginTop: 2 }}>
              {description}
            </Text>
          )}
        </View>
        <TrackThumb
          trackBg={trackBg}
          thumbStyle={thumbStyle}
          disabled={disabled}
          onToggle={() => !disabled && onToggle(!value)}
        />
      </View>
    )
  }

  return (
    <TrackThumb
      trackBg={trackBg}
      thumbStyle={thumbStyle}
      disabled={disabled}
      onToggle={() => !disabled && onToggle(!value)}
    />
  )
}

function TrackThumb({
  trackBg,
  thumbStyle,
  disabled,
  onToggle,
}: {
  trackBg: string
  thumbStyle: object
  disabled?: boolean
  onToggle: () => void
}) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      style={{ opacity: disabled ? 0.5 : 1 }}
      accessibilityRole="switch"
    >
      <View
        style={{
          width: TRACK_W,
          height: TRACK_H,
          borderRadius: 15,             // pill — half of 30px
          backgroundColor: trackBg,
          padding: THUMB_OFFSET,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 2,
              elevation: 2,
            },
            thumbStyle,
          ]}
        />
      </View>
    </Pressable>
  )
}
