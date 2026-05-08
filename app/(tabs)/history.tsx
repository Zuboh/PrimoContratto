import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { useHistoryStore } from '@/stores/historyStore'
import { AnalysisEntry } from '@/types'
import { formatRelativeDate } from '@/utils/format'
import { router } from 'expo-router'
import { ChevronRight, FileText, Trash2 } from 'lucide-react-native'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function getStatusColor(
  entry: AnalysisEntry,
  colors: { success: string; warning: string; destructive: string; muted: string },
) {
  const { result } = entry
  if (result.documentType === 'unknown') return colors.muted
  if (result.globalStatus === 'positive') return colors.success
  if (result.globalStatus === 'warning') return colors.warning
  return colors.destructive
}

function getDocTypeLabel(type: string) {
  if (type === 'contract') return 'Contratto'
  if (type === 'payslip') return 'Busta paga'
  return 'Documento'
}

function groupEntriesByDate(entries: AnalysisEntry[]): { label: string; data: AnalysisEntry[] }[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const groups: { [key: string]: AnalysisEntry[] } = {
    'Oggi': [],
    'Questa settimana': [],
    'Precedenti': [],
  }

  for (const entry of entries) {
    const date = new Date(entry.createdAt)
    date.setHours(0, 0, 0, 0)
    if (date >= today) groups['Oggi'].push(entry)
    else if (date >= weekAgo) groups['Questa settimana'].push(entry)
    else groups['Precedenti'].push(entry)
  }

  return Object.entries(groups)
    .filter(([, data]) => data.length > 0)
    .map(([label, data]) => ({ label, data }))
}

export default function HistoryScreen() {
  const { colors, typography, spacing } = useTheme()
  const { entries, removeEntry, clearHistory } = useHistoryStore()

  const handleOpenEntry = (entry: AnalysisEntry) => {
    useAnalysisStore.getState().setAnalysis(entry.result, entry.fileName)
    router.push({ pathname: '/report/[id]', params: { id: entry.id } })
  }

  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Elimina analisi',
      'Vuoi rimuovere questa analisi dalla cronologia?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Elimina', style: 'destructive', onPress: () => removeEntry(id) },
      ],
    )
  }

  const handleClearAll = () => {
    Alert.alert('Elimina tutto', 'Vuoi eliminare tutta la cronologia?', [
      { text: 'Annulla', style: 'cancel' },
      { text: 'Elimina tutto', style: 'destructive', onPress: clearHistory },
    ])
  }

  const grouped = groupEntriesByDate(entries)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[typography.h2, { color: colors.foreground }]}>Storico</Text>
        {entries.length > 0 && (
          <Pressable onPress={handleClearAll} hitSlop={8}>
            <Trash2 size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <FileText size={48} color={colors.muted} />
          <Text
            style={[
              typography.h3,
              { color: colors.foreground, marginTop: spacing[4], textAlign: 'center' },
            ]}
          >
            Nessuna analisi ancora
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.muted, textAlign: 'center', marginTop: spacing[2] },
            ]}
          >
            Carica un contratto o una busta paga per iniziare
          </Text>
          <Pressable
            style={[styles.ctaButton, { backgroundColor: colors.primary, marginTop: spacing[8] }]}
            onPress={() => router.push('/upload')}
          >
            <Text style={[typography.label, { color: colors.primaryForeground }]}>
              Carica il tuo primo documento
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {grouped.map(({ label, data }, groupIndex) => (
            <View key={label}>
              <Text
                style={[
                  typography.caption,
                  styles.sectionHeader,
                  { color: colors.muted, marginTop: groupIndex === 0 ? 16 : 20 },
                ]}
              >
                {label.toUpperCase()}
              </Text>
              {data.map((entry) => (
                <Pressable
                  key={entry.id}
                  style={[
                    styles.entryCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                  onPress={() => handleOpenEntry(entry)}
                  onLongPress={() => handleDeleteEntry(entry.id)}
                >
                  <View style={styles.entryRow}>
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(entry, colors) },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[typography.label, { color: colors.foreground }]}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                      >
                        {entry.fileName}
                      </Text>
                      <View style={styles.entryMeta}>
                        <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                          <Text style={[typography.caption, { color: colors.primary }]}>
                            {getDocTypeLabel(entry.result.documentType)}
                          </Text>
                        </View>
                        <Text style={[typography.caption, { color: colors.muted }]}>
                          {formatRelativeDate(entry.createdAt)}
                        </Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color={colors.muted} />
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  ctaButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  sectionHeader: {
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  entryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})
