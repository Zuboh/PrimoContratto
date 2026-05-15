import { useTheme } from '@/hooks/useTheme'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { TextFieldProps } from './TextField.types'

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  helperText,
  errorText,
  leadingIcon,
  trailingIcon,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'sentences',
  autoComplete,
  state = 'default',
  style,
  multiline,
}: TextFieldProps) {
  const { colors, radius, spacing } = useTheme()
  const [focused, setFocused] = useState(false)

  const isDisabled = state === 'disabled'
  const isError = state === 'error'
  const isSuccess = state === 'success'

  // DS: --surface-2 at rest → --surface on focus
  const fieldBg = focused ? colors.surface : colors.surface2

  // DS focus ring: 1.5px sage-600 inner + 4px halo
  const borderColor = isError
    ? colors.danger
    : isSuccess
    ? colors.sage600
    : focused
    ? colors.sage600
    : 'transparent'

  const focusShadow = focused
    ? {
        shadowColor: isError ? colors.danger : colors.sage600,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isError ? 0.10 : 0.12,
        shadowRadius: 4,
        elevation: 0,
      }
    : {}

  const helperColor = isError
    ? colors.danger
    : isSuccess
    ? colors.sage600
    : colors.muted

  const displayHelper = errorText ?? helperText

  return (
    <View style={[{ opacity: isDisabled ? 0.6 : 1 }, style]}>
      {/* Label */}
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Nunito_700Bold',
            color: colors.foreground,
            marginBottom: spacing[2],
          }}
        >
          {label}
        </Text>
      )}

      {/* Input well */}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            gap: 10,
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: radius.sm,     // --r-sm: 14px
            backgroundColor: fieldBg,
            borderWidth: 1.5,
            borderColor: borderColor,
            minHeight: multiline ? 84 : 48,
          },
          focusShadow,
        ]}
      >
        {leadingIcon && (
          <View style={{ opacity: focused ? 1 : 0.6 }}>{leadingIcon}</View>
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: 'Nunito_400Regular',
            color: colors.foreground,
            padding: 0,
            margin: 0,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete as any}
          editable={!isDisabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={multiline}
        />
        {trailingIcon && (
          <View style={{ opacity: focused ? 1 : 0.6 }}>{trailingIcon}</View>
        )}
      </View>

      {/* Helper / Error */}
      {displayHelper && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Nunito_400Regular',
            color: helperColor,
            marginTop: spacing[2],
          }}
        >
          {displayHelper}
        </Text>
      )}
    </View>
  )
}
