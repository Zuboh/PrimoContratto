import LogoSvg from '@/assets/images/icon.svg'
import { useTheme } from '@/hooks/useTheme'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './Logo.styles'
import { LogoProps, LogoWithTextProps } from './Logo.types'

export function Logo({ size = 36 }: LogoProps) {
  return <LogoSvg width={size} height={size} />
}

export function LogoWithText({ size = 36, style }: LogoWithTextProps) {
  const theme = useTheme()
  const styles = createStyles(theme, size)

  return (
    <View style={[styles.row, style]}>
      <Logo size={size} />
      <MaskedView
        maskElement={<Text style={styles.brandName}>PrimoContratto</Text>}
      >
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.brandName, { opacity: 0 }]}>PrimoContratto</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  )
}
