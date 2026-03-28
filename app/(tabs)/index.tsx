import { GuideCard, HeroSection, TrustPills } from '@/components/home'
import { BottomNav } from '@/components/layout/BottomNav/index'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { colors, spacing } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <LogoWithText size={36} style={{ marginBottom: spacing[8] }} />
          <HeroSection style={{ marginBottom: spacing[8] }} />
          <GuideCard />
        </View>
        <TrustPills />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 56,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})
