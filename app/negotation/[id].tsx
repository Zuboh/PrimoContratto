import { BottomNav } from '@/components/layout/BottomNav/index'
import { useTheme } from '@/hooks/useTheme'
import { negotiateContract } from '@/services/ai'
import { useAnalysisStore } from '@/stores/analysisStore'
import { NegotiationPoint, NegotiationResult } from '@/types'
import { router } from 'expo-router'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function NegotiationPointCard({
  point,
  colors,
  typography,
  spacing,
}: {
  point: NegotiationPoint
  colors: ReturnType<typeof useTheme>['colors']
  typography: ReturnType<typeof useTheme>['typography']
  spacing: ReturnType<typeof useTheme>['spacing']
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <View
      style={[
        styles.pointCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Pressable
        style={styles.pointHeader}
        onPress={() => setExpanded((v) => !v)}
      >
        <Text
          style={[typography.label, { color: colors.foreground, flex: 1 }]}
        >
          {point.clauseTitle}
        </Text>
        {expanded ? (
          <ChevronUp size={16} color={colors.muted} />
        ) : (
          <ChevronDown size={16} color={colors.muted} />
        )}
      </Pressable>

      <Text
        style={[
          typography.body,
          { color: colors.foreground, marginTop: spacing[2] },
        ]}
      >
        {point.opening}
      </Text>

      {expanded && (
        <>
          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border, marginVertical: spacing[3] },
            ]}
          />
          <Text
            style={[typography.caption, { color: colors.muted, marginBottom: spacing[1] }]}
          >
            SE OBIETTANO
          </Text>
          <Text style={[typography.body, { color: colors.foreground }]}>
            {point.objectionResponse}
          </Text>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border, marginVertical: spacing[3] },
            ]}
          />
          <Text
            style={[typography.caption, { color: colors.muted, marginBottom: spacing[1] }]}
          >
            PIANO B
          </Text>
          <Text style={[typography.body, { color: colors.foreground }]}>
            {point.fallback}
          </Text>
        </>
      )}
    </View>
  )
}

export default function NegotiationScreen() {
  const { colors, typography, spacing } = useTheme()
  const { currentAnalysis } = useAnalysisStore()
  const [result, setResult] = useState<NegotiationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentAnalysis || currentAnalysis.documentType !== 'contract') {
      router.replace('/')
      return
    }

    negotiateContract(JSON.stringify(currentAnalysis))
      .then(setResult)
      .catch((e) => setError(e instanceof Error ? e.message : 'Errore analisi'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft size={22} color={colors.foreground} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.foreground, flex: 1, marginLeft: spacing[3] }]}>
          Script di negoziazione
        </Text>
      </View>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text
            style={[
              typography.body,
              { color: colors.muted, marginTop: spacing[4], textAlign: 'center' },
            ]}
          >
            Sto preparando il tuo script…
          </Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centered}>
          <Text style={[typography.h3, { color: colors.foreground, textAlign: 'center' }]}>
            Qualcosa è andato storto
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.muted, textAlign: 'center', marginTop: spacing[2] },
            ]}
          >
            {error}
          </Text>
          <Pressable
            style={[
              styles.retryButton,
              { backgroundColor: colors.primary, marginTop: spacing[6] },
            ]}
            onPress={() => router.back()}
          >
            <Text style={[typography.label, { color: colors.primaryForeground }]}>
              Torna al report
            </Text>
          </Pressable>
        </View>
      )}

      {!loading && result && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              typography.body,
              {
                color: colors.foreground,
                marginBottom: spacing[6],
                lineHeight: 24,
              },
            ]}
          >
            {result.intro}
          </Text>

          <Text
            style={[
              typography.label,
              { color: colors.muted, marginBottom: spacing[3], letterSpacing: 0.5 },
            ]}
          >
            PUNTI DA NEGOZIARE
          </Text>

          {result.points.map((point) => (
            <NegotiationPointCard
              key={point.id}
              point={point}
              colors={colors}
              typography={typography}
              spacing={spacing}
            />
          ))}

          <View
            style={[
              styles.closingCard,
              { backgroundColor: colors.surface, borderColor: colors.border, marginTop: spacing[4] },
            ]}
          >
            <Text
              style={[typography.caption, { color: colors.muted, marginBottom: spacing[2], letterSpacing: 0.5 }]}
            >
              CHIUSURA
            </Text>
            <Text style={[typography.body, { color: colors.foreground }]}>
              {result.closing}
            </Text>
          </View>
        </ScrollView>
      )}

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  content: {
    padding: 24,
  },
  pointCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    height: 1,
  },
  closingCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  retryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
})
