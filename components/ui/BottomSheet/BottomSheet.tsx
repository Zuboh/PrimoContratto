import { useTheme } from '@/hooks/useTheme'
import React, { useEffect } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Button } from '../Button/Button'
import { BottomSheetProps } from './BottomSheet.types'

// DS: slides from +100% → 0 in 360ms e-out, overlay fades in
export function BottomSheet({
  visible,
  onClose,
  title,
  description,
  variant = 'default',
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  children,
}: BottomSheetProps) {
  const { colors, spacing, radius, shadow } = useTheme()

  const translateY = useSharedValue(400)
  const overlayOpacity = useSharedValue(0)

  useEffect(() => {
    if (visible) {
      overlayOpacity.value = withTiming(1, { duration: 240 })
      translateY.value = withTiming(0, { duration: 360 })
    } else {
      overlayOpacity.value = withTiming(0, { duration: 240 })
      translateY.value = withTiming(400, { duration: 300 })
    }
  }, [visible])

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }))

  // Variant accent color for icon/title
  const accentColor =
    variant === 'destructive'
      ? colors.danger
      : variant === 'success'
      ? colors.success
      : variant === 'info'
      ? colors.info
      : colors.primary

  if (!visible) return null

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="none">
      {/* Overlay */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: colors.overlay,
          },
          overlayStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            paddingBottom: 32,
            ...shadow.lg,
          },
          sheetStyle,
        ]}
      >
        {/* Drag handle — DS: 38×4px capsule, 14px from top */}
        <View style={{ alignItems: 'center', paddingTop: 14, paddingBottom: spacing[5] }}>
          <View
            style={{
              width: 38,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.surface3,
            }}
          />
        </View>

        <View style={{ paddingHorizontal: spacing[6] }}>
          {/* Icon row for non-default variants */}
          {variant !== 'default' && (
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: accentColor + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing[4],
                alignSelf: 'center',
              }}
            >
              <Text style={{ fontSize: 24 }}>
                {variant === 'destructive' ? '⚠️'
                  : variant === 'success' ? '✅'
                  : variant === 'info' ? 'ℹ️'
                  : variant === 'confirmation' ? '💬'
                  : '📋'}
              </Text>
            </View>
          )}

          {/* Title */}
          {title && (
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito_800ExtraBold',
                color: colors.foreground,
                textAlign: 'center',
                marginBottom: spacing[2],
              }}
            >
              {title}
            </Text>
          )}

          {/* Description */}
          {description && (
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Nunito_400Regular',
                color: colors.muted,
                textAlign: 'center',
                lineHeight: 22,
                marginBottom: spacing[6],
              }}
            >
              {description}
            </Text>
          )}

          {/* Children (custom content) */}
          {children && <View style={{ marginBottom: spacing[6] }}>{children}</View>}

          {/* Actions */}
          <View style={{ gap: spacing[3] }}>
            {primaryLabel && onPrimary && (
              <Button
                label={primaryLabel}
                onPress={() => { onPrimary(); onClose() }}
                variant={variant === 'destructive' ? 'primary' : 'primary'}
                style={variant === 'destructive' ? { backgroundColor: colors.danger } : undefined}
              />
            )}
            {secondaryLabel && (
              <Button
                label={secondaryLabel}
                onPress={onSecondary ?? onClose}
                variant="secondary"
              />
            )}
          </View>
        </View>
      </Animated.View>
    </Modal>
  )
}
