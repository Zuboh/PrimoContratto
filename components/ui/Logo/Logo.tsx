import LogoSvg from '@/assets/images/icon.svg'
import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'
import { LogoProps, LogoWithTextProps } from './Logo.types'

export function Logo({ size = 36 }: LogoProps) {
  return <LogoSvg width={size} height={size} />
}

export function LogoWithText({ size = 36, style }: LogoWithTextProps) {
  const theme = useTheme()

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}>
      <Logo size={size} />
      <Text
        style={{
          fontFamily: theme.fontFamily.extraBold,
          fontSize: size * 0.6,
          color: theme.colors.foreground,
        }}
      >
        Primo
      </Text>
    </View>
  )
}
