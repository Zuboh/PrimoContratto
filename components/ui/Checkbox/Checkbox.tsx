import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { CheckboxProps } from './Checkbox.types'

// DS: 22×22px, r=7px, sage-700 checked, white check 14×14px
export function Checkbox({ value, onToggle, label, disabled }: CheckboxProps) {
  const { colors, spacing } = useTheme()

  const boxBg = value ? colors.primary : 'transparent'
  const borderColor = value ? colors.primary : colors.surface3

  return (
    <Pressable
      onPress={() => !disabled && onToggle(!value)}
      hitSlop={8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        opacity: disabled ? 0.5 : 1,
      }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 7,
          backgroundColor: boxBg,
          borderWidth: 1.5,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value && (
          <Text style={{ fontSize: 12, color: '#FFFFFF', lineHeight: 14 }}>✓</Text>
        )}
      </View>
      {label && (
        <Text style={{ fontSize: 14, fontFamily: 'Nunito_400Regular', color: colors.foreground, flex: 1 }}>
          {label}
        </Text>
      )}
    </Pressable>
  )
}
