import { BottomNav } from '@/components/layout/BottomNav/index'
import { GuideCard } from '@/components/home/GuideCard'
import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useHistoryStore } from '@/stores/historyStore'
import { router } from 'expo-router'
import { Bell } from 'lucide-react-native'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { colors, typography, spacing, radius, shadow, fontFamily } = useTheme()
  const { user } = useAuthStore()
  const { entries } = useHistoryStore()

  const lastEntry = entries[entries.length - 1]
  const hasData = entries.length > 0 && lastEntry?.result.documentType === 'payslip'

  const greeting = user?.name
    ? `Ciao ${user.name}! 👋`
    : 'Ciao! 👋'

  const globalStatus =
    lastEntry?.result?.documentType !== 'unknown'
      ? (lastEntry?.result as any)?.globalStatus
      : undefined
  const statusOk = globalStatus === 'positive'

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: spacing[6],
          paddingTop: spacing[6],
          paddingBottom: spacing[10],
          gap: spacing[5],
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[typography.h2, { color: colors.foreground }]}>{greeting}</Text>
          <Pressable hitSlop={8}>
            <Bell size={22} color={colors.foreground} />
          </Pressable>
        </View>

        {/* Hero: empty or loaded state */}
        {hasData ? (
          <View>
            {/* Loaded state: big salary number */}
            <View
              style={[
                {
                  backgroundColor: colors.surface,
                  borderRadius: radius.lg,
                  padding: spacing[6],
                  borderWidth: 1,
                  borderColor: colors.border,
                  gap: spacing[2],
                },
                shadow.sm,
              ]}
            >
              <Text style={[typography.caption, { color: colors.muted }]}>Ultimo netto</Text>
              <Text
                style={{
                  fontFamily: fontFamily.numericBold,
                  fontSize: 32,
                  color: colors.foreground,
                }}
              >
                {(lastEntry!.result as any).netSalary}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[2] }}>
                <View
                  style={{
                    backgroundColor: colors.primaryLight,
                    borderRadius: radius.full,
                    paddingHorizontal: spacing[3],
                    paddingVertical: 2,
                  }}
                >
                  <Text style={[typography.caption, { color: colors.primary }]}>
                    {(lastEntry!.result as any).period}
                  </Text>
                </View>
              </View>
            </View>

            {/* Status card */}
            <View
              style={{
                marginTop: spacing[3],
                backgroundColor: statusOk ? colors.successLight : colors.warningLight,
                borderRadius: radius.lg,
                padding: spacing[4],
                borderWidth: 1,
                borderColor: statusOk ? colors.successBorder : colors.warningBorder,
              }}
            >
              <Text style={[typography.label, { color: statusOk ? colors.success : colors.warning }]}>
                {statusOk ? '✓ Tutto regolare' : '⚠ Da tenere d\'occhio'}
              </Text>
            </View>
          </View>
        ) : (
          /* Empty state */
          <View
            style={[
              {
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                padding: spacing[6],
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center',
                gap: spacing[4],
              },
              shadow.sm,
            ]}
          >
            <IllustrationPlaceholder size="md" />
            <View style={{ gap: spacing[1], alignItems: 'center' }}>
              <Text style={[typography.h3, { color: colors.foreground, textAlign: 'center' }]}>
                Nessun documento ancora
              </Text>
              <Text style={[typography.body, { color: colors.muted, textAlign: 'center' }]}>
                Carica il tuo primo cedolino o contratto
              </Text>
            </View>
            <Pressable
              onPress={() => router.navigate('/upload')}
              style={{
                backgroundColor: colors.primary,
                borderRadius: radius.full,
                paddingVertical: spacing[3],
                paddingHorizontal: spacing[6],
              }}
            >
              <Text style={[typography.label, { color: colors.primaryForeground }]}>
                Carica cedolino →
              </Text>
            </Pressable>
          </View>
        )}

        {/* Guide card */}
        <GuideCard />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  )
}
