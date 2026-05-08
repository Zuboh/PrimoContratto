import { StatCard } from '@/components/home'
import { Button } from '@/components/ui/Button/Button'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { supabase } from '@/services/supabase'
import { useHistoryStore } from '@/stores/historyStore'
import { useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  FileText,
  Lock,
  Upload,
} from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TIPS = [
  'Controlla sempre la durata del periodo di prova: per legge non può superare i 6 mesi.',
  'Il CCNL applicato al tuo contratto determina benefit, ferie e retribuzione minima.',
  'Una busta paga corretta deve indicare chiaramente la base imponibile IRPEF.',
]

function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Oggi'
  if (diffDays === 1) return 'Ieri'
  if (diffDays < 7) return `${diffDays} giorni fa`
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
}

export default function HomeScreen() {
  const { colors, typography } = useTheme()
  const router = useRouter()
  const entries = useHistoryStore((s) => s.entries)
  const [firstName, setFirstName] = useState('utente')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user
      if (!user) return
      const name =
        user.user_metadata?.full_name?.split(' ')[0] ??
        user.email?.split('@')[0] ??
        'utente'
      setFirstName(name)
    })
  }, [])

  const totalCount = entries.length
  const positiveCount = entries.filter((e) => e.result.globalStatus === 'positive').length
  const criticalCount = entries.filter((e) => e.result.globalStatus === 'critical').length
  const recentEntries = entries.slice(0, 3)

  const statusColor = (status: string) => {
    if (status === 'positive') return colors.success
    if (status === 'warning') return colors.warning
    return colors.destructive
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingTop: 20,
          paddingBottom: 120,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={[typography.h2, { color: colors.foreground }]}>
              Ciao, {firstName} 👋
            </Text>
            <Text style={[typography.body, { color: colors.muted, marginTop: 4 }]}>
              Pronto ad analizzare?
            </Text>
          </View>
          <LogoWithText size={28} />
        </View>

        {/* Upload CTA */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.primary + '1F',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Upload size={20} color={colors.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={[typography.label, { color: colors.foreground }]}>
                Analizza un documento
              </Text>
              <Text style={[typography.caption, { color: colors.muted }]}>
                PDF, foto o immagine
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <Lock size={12} color={colors.muted} strokeWidth={2} />
            <Text style={[typography.caption, { color: colors.muted }]}>
              I tuoi dati non vengono salvati
            </Text>
          </View>
          <Button
            label="Inizia analisi"
            variant="primary"
            fullWidth
            onPress={() => router.push('/upload')}
          />
        </View>

        {/* Stats */}
        <View>
          <Text
            style={[
              typography.overline,
              { color: colors.muted, marginBottom: 8 },
            ]}
          >
            LE TUE ANALISI
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <StatCard label="Analisi" value={totalCount} icon={FileText} iconColor={colors.primary} />
            <StatCard label="Favorevoli" value={positiveCount} icon={CheckCircle} iconColor={colors.success} />
            <StatCard label="Critiche" value={criticalCount} icon={AlertCircle} iconColor={colors.destructive} />
          </View>
        </View>

        {/* Recent */}
        {recentEntries.length > 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={[typography.overline, { color: colors.muted }]}>RECENTI</Text>
              <Pressable onPress={() => router.push('/history' as any)}>
                <Text style={[typography.caption, { color: colors.primary }]}>Vedi tutte</Text>
              </Pressable>
            </View>
            {recentEntries.map((entry) => (
              <Pressable
                key={entry.id}
                onPress={() => router.push(`/report/${entry.id}` as any)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  padding: 12,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: statusColor(entry.result.globalStatus),
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[typography.labelSm, { color: colors.foreground }]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {entry.fileName}
                  </Text>
                  <Text style={[typography.caption, { color: colors.muted }]}>
                    {formatRelativeDate(entry.createdAt)}
                  </Text>
                </View>
                <ChevronRight size={16} color={colors.muted} strokeWidth={2} />
              </Pressable>
            ))}
          </View>
        )}

        {/* Tip */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 16,
            padding: 12,
          }}
        >
          <Text style={[typography.overline, { color: colors.muted, marginBottom: 6 }]}>
            LO SAPEVI?
          </Text>
          <Text style={[typography.body, { color: colors.foreground }]}>{TIPS[0]}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
