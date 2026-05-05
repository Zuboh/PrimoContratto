import { BottomNav } from '@/components/layout/BottomNav/index'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { useHistoryStore } from '@/stores/historyStore'
import Constants from 'expo-constants'
import { router } from 'expo-router'
import {
  ChevronRight,
  HelpCircle,
  Info,
  LogIn,
  Trash2,
  User,
} from 'lucide-react-native'
import React from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface RowColors {
  foreground: string
  muted: string
  destructive: string
  border: string
}

interface SettingsRowProps {
  icon: React.ReactNode
  label: string
  rightLabel?: string
  onPress?: () => void
  destructive?: boolean
  colors: RowColors
  bodyStyle: object
  captionStyle: object
}

function SettingsRow({
  icon,
  label,
  rightLabel,
  onPress,
  destructive,
  colors,
  bodyStyle,
  captionStyle,
}: SettingsRowProps) {
  return (
    <Pressable
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.rowLeft}>
        {icon}
        <Text style={[bodyStyle, { color: destructive ? colors.destructive : colors.foreground }]}>
          {label}
        </Text>
      </View>
      <View style={styles.rowRight}>
        {rightLabel && (
          <Text style={[captionStyle, { color: colors.muted }]}>{rightLabel}</Text>
        )}
        {onPress && <ChevronRight size={16} color={colors.muted} />}
      </View>
    </Pressable>
  )
}

export default function SettingsScreen() {
  const { colors, typography, spacing } = useTheme()
  const { isLoggedIn, user } = useAuthStore()
  const { clearHistory } = useHistoryStore()

  const version = Constants.expoConfig?.version ?? '—'

  const handleDeleteHistory = () => {
    Alert.alert(
      'Elimina cronologia',
      'Vuoi eliminare tutta la cronologia delle analisi?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Elimina', style: 'destructive', onPress: clearHistory },
      ],
    )
  }

  const rowProps = {
    colors: {
      foreground: colors.foreground,
      muted: colors.muted,
      destructive: colors.destructive,
      border: colors.border,
    },
    bodyStyle: typography.body,
    captionStyle: typography.caption,
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[typography.h2, { color: colors.foreground }]}>Impostazioni</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { marginTop: spacing[4] }]}>
          <Text
            style={[
              typography.caption,
              { color: colors.muted, ...styles.sectionLabel },
            ]}
          >
            ACCOUNT
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            {isLoggedIn && user ? (
              <SettingsRow
                icon={<User size={18} color={colors.muted} />}
                label={user.email}
                rightLabel={user.plan === 'pro' ? 'Pro' : 'Gratuito'}
                {...rowProps}
              />
            ) : (
              <SettingsRow
                icon={<LogIn size={18} color={colors.muted} />}
                label="Accedi o registrati"
                onPress={() => router.push('/upload')}
                {...rowProps}
              />
            )}
          </View>
        </View>

        <View style={[styles.section, { marginTop: spacing[6] }]}>
          <Text
            style={[
              typography.caption,
              { color: colors.muted, ...styles.sectionLabel },
            ]}
          >
            DATI
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <SettingsRow
              icon={<Trash2 size={18} color={colors.destructive} />}
              label="Elimina cronologia"
              onPress={handleDeleteHistory}
              destructive
              {...rowProps}
            />
          </View>
        </View>

        <View style={[styles.section, { marginTop: spacing[6] }]}>
          <Text
            style={[
              typography.caption,
              { color: colors.muted, ...styles.sectionLabel },
            ]}
          >
            INFO
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <SettingsRow
              icon={<Info size={18} color={colors.muted} />}
              label="Versione"
              rightLabel={version}
              {...rowProps}
            />
            <SettingsRow
              icon={<HelpCircle size={18} color={colors.muted} />}
              label="Centro assistenza"
              onPress={() => {}}
              {...rowProps}
            />
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionLabel: {
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
})
