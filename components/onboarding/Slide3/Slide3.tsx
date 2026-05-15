import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Dimensions, Image, Text, View, useWindowDimensions } from 'react-native'
import { createStyles } from './Slide3.styles'

const { width: W } = Dimensions.get('window')

export function Slide3() {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()
  const isSmallScreen = height < 760
  const styles = createStyles(theme, isSmallScreen)

  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View style={[styles.container, { width: W }]}>
      <Text style={styles.title}>
        Un compagno sereno,{'\n'}
        ogni mese.
      </Text>

      <Text style={styles.description}>
        Ti accompagniamo ogni mese con chiarezza e cura, perché capire il tuo stipendio non dovrebbe essere stressante.
      </Text>

      <View style={styles.pandaWrapper}>
        <Image
          source={require('@/assets/images/panda-leaf.png')}
          style={{ width: pandaWidth, height: pandaHeight }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}
