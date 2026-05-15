import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { Dimensions, Image, Text, View, useWindowDimensions } from 'react-native'
import { createStyles } from './Slide2.styles'

const { width: W } = Dimensions.get('window')

export function Slide2() {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()
  const isSmallScreen = height < 760
  const styles = createStyles(theme, isSmallScreen)

  const pandaWidth = width * 0.92
  const pandaHeight = isSmallScreen ? 220 : 260

  return (
    <View style={[styles.container, { width: W }]}>
      <Text style={styles.title}>
        Capisci ogni voce{'\n'}
        della tua busta paga,{'\n'}
        senza stress.
      </Text>

      <Text style={styles.description}>
        Spieghiamo tutto in modo chiaro{'\n'}
        e semplice, per darti sempre{'\n'}
        trasparenza e fiducia.
      </Text>

      <View style={styles.pandaWrapper}>
        <Image
          source={require('@/assets/images/panda-lying.png')}
          style={{ width: pandaWidth, height: pandaHeight }}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}
