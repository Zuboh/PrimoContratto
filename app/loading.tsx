import { BottomNav } from '@/components/layout/BottomNav/BottomNav'
import { AnalysisChips } from '@/components/loading/AnalysisChips'
import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'
import { useAnalysis } from '@/hooks/useAnalysis'
import { useAnalysisProgress } from '@/hooks/useAnalysisProgress'
import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { ANALYSIS_STEPS } from '@/components/loading/AnalysisChips/AnalysisChips.config'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoadingScreen() {
  const { colors, typography, spacing, radius } = useTheme()
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

  const progress = allDone ? 1 : currentStep / ANALYSIS_STEPS.length

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <Text style={[typography.h1, { color: colors.foreground }]}>
          {allDone ? 'Analisi completata' : 'Analisi in corso'}
        </Text>
        <Text style={[typography.body, { color: colors.muted, marginTop: spacing[1] }]}>
          {allDone
            ? 'Tutti i controlli sono stati eseguiti'
            : 'Ci vogliono circa 20 secondi'}
        </Text>

        {/* Progress bar */}
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: colors.surfaceAlt,
            borderRadius: radius.full,
            marginTop: spacing[5],
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundColor: colors.primary,
              borderRadius: radius.full,
            }}
          />
        </View>

        <AnalysisChips currentStep={currentStep} allDone={allDone} />

        <IllustrationPlaceholder size="md" style={{ marginTop: 'auto' as any }} />

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
    marginTop: 16,
    paddingVertical: 8,
  },
})
