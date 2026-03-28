import { BottomNav } from '@/components/layout/BottomNav/BottomNav'
import { AnalysisChips } from '@/components/loading/AnalysisChips'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { useAnalysis } from '@/hooks/useAnalysis'
import { useAnalysisProgress } from '@/hooks/useAnalysisProgress'
import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoadingScreen() {
  const { colors, typography, spacing } = useTheme()
  const { reset } = useAnalysisStore()

  const { analysisReady, onAllDone } = useAnalysis()
  const { currentStep, allDone } = useAnalysisProgress(true, analysisReady)

  useEffect(() => {
    if (allDone) onAllDone()
  }, [allDone])

  const handleCancel = () => {
    reset()
    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <LogoWithText size={36} style={{ marginBottom: spacing[6] }} />

        <Text style={[typography.label, { color: colors.foreground }]}>
          {allDone ? 'Analisi completata' : 'Analisi in corso...'}
        </Text>
        <Text
          style={[
            typography.caption,
            { color: colors.muted, marginTop: spacing[1] },
          ]}
        >
          {allDone
            ? 'Tutti i controlli sono stati eseguiti'
            : 'Ci vogliono circa 20 secondi'}
        </Text>

        <AnalysisChips currentStep={currentStep} allDone={allDone} />

        {!allDone && (
          <Pressable onPress={handleCancel} style={styles.cancelBtn}>
            <Text
              style={[
                typography.caption,
                { color: colors.muted, textDecorationLine: 'underline' },
              ]}
            >
              Annulla analisi
            </Text>
          </Pressable>
        )}
      </View>

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
    alignItems: 'center',
  },
  cancelBtn: {
    marginTop: 'auto',
    paddingVertical: 8,
  },
})
