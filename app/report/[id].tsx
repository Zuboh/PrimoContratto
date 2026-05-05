import { BottomNav } from '@/components/layout/BottomNav/index'
import {
  ClauseList,
  MissingClausesCard,
  SummaryCard,
  WarningBanner,
} from '@/components/reports'
import { AnomaliesCard } from '@/components/reports/AnomaliesCard/AnomaliesCard'
import { PayslipHeader } from '@/components/reports/PayslipHeader/PayslipHeader'
import { PayslipItems } from '@/components/reports/PayslipItems/PayslipItems'
import { ScoreBar } from '@/components/reports/ScoreBar/ScoreBar'
import { Badge } from '@/components/ui/Badge'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { ContractResult, PayslipResult } from '@/types'
import { router } from 'expo-router'
import { FileQuestion } from 'lucide-react-native'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ReportScreen() {
  const { colors, typography, spacing } = useTheme()
  const { currentAnalysis, currentFileName } = useAnalysisStore()

  if (!currentAnalysis) {
    router.replace('/')
    return null
  }

  // ── Documento non riconosciuto ──────────────────────────────────────────
  if (currentAnalysis.documentType === 'unknown') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <FileQuestion size={48} color={colors.muted} />
          <Text
            style={[
              typography.h2,
              {
                color: colors.foreground,
                marginTop: spacing[4],
                textAlign: 'center',
              },
            ]}
          >
            Documento non riconosciuto
          </Text>
          <Text
            style={[
              typography.body,
              {
                color: colors.muted,
                textAlign: 'center',
                marginTop: spacing[2],
              },
            ]}
          >
            {currentAnalysis.summary}
          </Text>
          <Pressable
            style={[
              styles.ctaButton,
              { backgroundColor: colors.primary, marginTop: spacing[8] },
            ]}
            onPress={() => router.replace('/upload')}
          >
            <Text
              style={[typography.label, { color: colors.primaryForeground }]}
            >
              Carica un altro documento
            </Text>
          </Pressable>
        </View>
        <BottomNav />
      </SafeAreaView>
    )
  }

  const isContract = currentAnalysis.documentType === 'contract'
  const isPayslip = currentAnalysis.documentType === 'payslip'

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <LogoWithText size={28} />
          {currentFileName && (
            <Text
              style={[
                typography.caption,
                { color: colors.muted, flex: 1, textAlign: 'right' },
              ]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {currentFileName}
            </Text>
          )}
        </View>

        {/* ── Badge tipo documento ── */}
        <View style={{ flexDirection: 'row', marginBottom: spacing[3] }}>
          {isContract && (
            <Badge
              label={`${(currentAnalysis as ContractResult).contractType} · ${(currentAnalysis as ContractResult).ccnl}`}
              variant="default"
            />
          )}
          {isPayslip && (
            <Badge
              label={`Busta paga · ${(currentAnalysis as PayslipResult).period}`}
              variant="default"
            />
          )}
        </View>

        {/* ── Warning banner ── */}
        <WarningBanner
          status={currentAnalysis.globalStatus}
          style={{ marginBottom: spacing[4] }}
        />

        {/* ── ScoreBar — passa l'analisi, pensa a tutto da sola ── */}
        <ScoreBar
          analysis={currentAnalysis}
          style={{ marginBottom: spacing[4] }}
        />

        {/* ── Riepilogo AI ── */}
        <SummaryCard
          summary={currentAnalysis.summary}
          style={{ marginBottom: spacing[6] }}
        />

        {/* ── Sezione contratto ── */}
        {isContract && (
          <>
            <ClauseList clauses={(currentAnalysis as ContractResult).clauses} />
            {(currentAnalysis as ContractResult).missingClauses.length > 0 && (
              <MissingClausesCard
                clauses={(currentAnalysis as ContractResult).missingClauses}
                style={{ marginTop: spacing[6] }}
              />
            )}
          </>
        )}

        {/* ── Sezione busta paga ── */}
        {isPayslip && (
          <>
            <PayslipHeader
              grossSalary={(currentAnalysis as PayslipResult).grossSalary}
              netSalary={(currentAnalysis as PayslipResult).netSalary}
              ccnl={(currentAnalysis as PayslipResult).ccnl}
              style={{ marginBottom: spacing[6] }}
            />
            <PayslipItems items={(currentAnalysis as PayslipResult).items} />
            {(currentAnalysis as PayslipResult).anomalies.length > 0 && (
              <AnomaliesCard
                anomalies={(currentAnalysis as PayslipResult).anomalies}
                style={{ marginTop: spacing[6] }}
              />
            )}
          </>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
