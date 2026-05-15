import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { createStyles } from './Slide1.styles'

export function Slide1() {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()
  const isSmallScreen = height < 760
  const styles = createStyles(theme, isSmallScreen)

  const logoWidth = width * 0.68
  const logoHeight = logoWidth * 0.34
  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo-wordmark.png')}
          style={{ width: logoWidth, height: logoHeight }}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Il tuo stipendio, spiegato bene.</Text>
      </View>

      <View style={styles.pandaWrapper}>
        <Image
          source={require('@/assets/images/panda-sitting.png')}
          style={{ width: pandaWidth, height: pandaHeight }}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.caption}>
        Un compagno tranquillo che ti aiuta a capire il tuo stipendio, ogni mese.
      </Text>
    </View>
  )
}
