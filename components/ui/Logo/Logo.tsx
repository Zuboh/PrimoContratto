import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle, Line, Path } from 'react-native-svg'
import { createStyles } from './Logo.styles'
import { LogoProps, LogoWithTextProps } from './Logo.types'

function LogoIcon({ size, color }: { size: number; color: string }) {
  const iconSize = size * 0.55

  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <Path d="M14 2L14 8L20 8" />
      <Circle cx="11" cy="14" r="3" />
      <Line x1="17" y1="20" x2="14.5" y2="17.5" />
    </Svg>
  )
}

export function Logo({ size = 36, style }: LogoProps) {
  const theme = useTheme()
  const styles = createStyles(theme, size)

  return (
    <View style={[styles.iconWrapper, style]}>
      <LogoIcon size={size} color={theme.colors.primary} />
    </View>
  )
}

export function LogoWithText({ size = 36, style }: LogoWithTextProps) {
  const theme = useTheme()
  const styles = createStyles(theme, size)

  return (
    <View style={[styles.row, style]}>
      <Logo size={size} />
      <Text style={styles.brandName}>PrimoContratto</Text>
    </View>
  )
}
