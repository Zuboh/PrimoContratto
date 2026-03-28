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
import { Badge } from '@/components/ui/Badge'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { ContractResult, PayslipResult } from '@/types'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ReportScreen() {
  const { colors, typography, spacing } = useTheme()
  const { currentAnalysis, currentFileName } = useAnalysisStore()

  // Nessuna analisi → torna alla home
  if (!currentAnalysis) {
    router.replace('/')
    return null
  }

  // Documento non riconosciuto
  if (currentAnalysis.documentType === 'unknown') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <Text style={{ fontSize: 48 }}>🤔</Text>
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
        {/* Logo */}
        <LogoWithText size={36} style={{ marginBottom: spacing[4] }} />

        {/* Badge tipo documento */}
        <View style={{ flexDirection: 'row', marginBottom: spacing[4] }}>
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

        {/* Warning banner */}
        <WarningBanner
          status={currentAnalysis.globalStatus}
          style={{ marginBottom: spacing[4] }}
        />

        {/* Riepilogo AI */}
        <SummaryCard
          summary={currentAnalysis.summary}
          style={{ marginBottom: spacing[6] }}
        />

        {/* ── LAYOUT CONTRATTO ── */}
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

        {/* ── LAYOUT BUSTA PAGA ── */}
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

        {/* Spacer per CTA */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA fissa — solo per contratti */}
      {isContract && (
        <View
          style={[
            styles.ctaContainer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <Pressable
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={() =>
              router.push({
                pathname: '/negotation/[id]',
                params: { id: Date.now().toString() },
              })
            }
          >
            <Text
              style={[typography.label, { color: colors.primaryForeground }]}
            >
              Vedi lo script di negoziazione →
            </Text>
          </Pressable>
        </View>
      )}

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
  ctaContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
