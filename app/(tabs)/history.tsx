import { BottomNav } from '@/components/layout/BottomNav/index'
import { useTheme } from '@/hooks/useTheme'
import { useAnalysisStore } from '@/stores/analysisStore'
import { useHistoryStore } from '@/stores/historyStore'
import { AnalysisEntry } from '@/types'
import { formatRelativeDate } from '@/utils/format'
import { router } from 'expo-router'
import { FileText, Trash2 } from 'lucide-react-native'
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
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
            style={[
              styles.ctaButton,
              { backgroundColor: colors.primary, marginTop: spacing[8] },
            ]}
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
          contentContainerStyle={[styles.listContent, { paddingBottom: 120 }]}
          showsVerticalScrollIndicator={false}
        >
          {entries.map((entry) => (
            <Pressable
              key={entry.id}
              style={[
                styles.entryCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => handleOpenEntry(entry)}
              onLongPress={() => handleDeleteEntry(entry.id)}
            >
              <View style={styles.entryTop}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(entry, colors) },
                  ]}
                />
                <Text
                  style={[typography.label, { color: colors.foreground, flex: 1 }]}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {entry.fileName}
                </Text>
              </View>
              <View style={styles.entryBottom}>
                <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[typography.caption, { color: colors.primary }]}>
                    {getDocTypeLabel(entry.result.documentType)}
                  </Text>
                </View>
                <Text style={[typography.caption, { color: colors.muted }]}>
                  {formatRelativeDate(entry.createdAt)}
                </Text>
              </View>
            </Pressable>
          ))}
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
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
    padding: 16,
    gap: 12,
  },
  entryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  entryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  entryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
})
