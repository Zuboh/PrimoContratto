import { Button, GradientText } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './HeroSection.styles'
import { HeroSectionProps } from './HeroSection.types'

export function HeroSection({ style }: HeroSectionProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={styles.title}>Capire il tuo </Text>
          <GradientText text="contratto" style={styles.titleHighlight} />
        </View>
        <Text style={styles.title}>non è mai stato così semplice.</Text>
        <Text style={styles.subtitle}>
          Carica un file e ricevi un&apos;analisi completa in 30 secondi.
          Gratis.
        </Text>
      </View>

      <View style={styles.ctaContainer}>
        <Button
          label="Analizza il contratto →"
          onPress={() => router.navigate('/upload')}
        />
      </View>
    </View>
  )
}
