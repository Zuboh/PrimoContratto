import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Image, View, Text } from 'react-native'
import { LogoProps, LogoWithTextProps } from './Logo.types'

const logoSource = require('@/assets/images/logo.png')

export function Logo({ size = 36 }: LogoProps) {
  return (
    <Image
      source={logoSource}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}

export function LogoWithText({ size = 36, style }: LogoWithTextProps) {
  const { colors, fontFamily } = useTheme()

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 6 }, style]}>
      <Logo size={size} />
      <Text
        style={{
          fontFamily: fontFamily.extraBold,
          fontSize: size * 0.6,
          color: colors.foreground,
          letterSpacing: -0.3,
        }}
      >
        Primo
      </Text>
    </View>
  )
}
