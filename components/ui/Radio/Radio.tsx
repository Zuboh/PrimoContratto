import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { RadioGroupProps, RadioProps } from './Radio.types'

// DS: 22×22px circle, 10×10px inner dot, sage-700 selected
export function Radio({ value, onSelect, label, description, disabled }: RadioProps) {
  const { colors, spacing } = useTheme()

  const outerBorder = value ? colors.primary : colors.surface3

  return (
    <Pressable
      onPress={() => !disabled && onSelect()}
      hitSlop={8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        opacity: disabled ? 0.5 : 1,
      }}
      accessibilityRole="radio"
      accessibilityState={{ checked: value }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 1.5,
          borderColor: outerBorder,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: value ? colors.surface : 'transparent',
        }}
      >
        {value && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.primary,
            }}
          />
        )}
      </View>
      {(label || description) && (
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
      )}
    </Pressable>
  )
}

export function RadioGroup({ options, selected, onSelect, disabled }: RadioGroupProps) {
  const { colors, spacing, radius } = useTheme()
  return (
    <View
      style={{
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
        overflow: 'hidden',
      }}
    >
      {options.map((opt, i) => (
        <View
          key={opt.value}
          style={{
            borderBottomWidth: i < options.length - 1 ? 1 : 0,
            borderBottomColor: colors.border,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[4],
          }}
        >
          <Radio
            value={selected === opt.value}
            onSelect={() => onSelect(opt.value)}
            label={opt.label}
            description={opt.description}
            disabled={disabled}
          />
        </View>
      ))}
    </View>
  )
}
