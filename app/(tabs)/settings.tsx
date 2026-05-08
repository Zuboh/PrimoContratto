import { Toggle } from '@/components/ui/Toggle/Toggle'
import { supabase } from '@/services/supabase'
import { useThemeStore } from '@/stores/themeStore'
import { useHistoryStore } from '@/stores/historyStore'
import { useTheme } from '@/hooks/useTheme'
import Constants from 'expo-constants'
import { router } from 'expo-router'
import {
  ChevronRight,
  HelpCircle,
  Info,
  LogIn,
  LogOut,
  Moon,
  ShieldCheck,
  Trash2,
  User,
} from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
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
  rightElement?: React.ReactNode
  onPress?: () => void
  destructive?: boolean
  colors: RowColors
  bodyStyle: object
  captionStyle: object
  isLast?: boolean
}

function SettingsRow({
  icon,
  label,
  rightLabel,
  rightElement,
  onPress,
  destructive,
  colors,
  bodyStyle,
  captionStyle,
  isLast,
}: SettingsRowProps) {
  return (
    <Pressable
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
      ]}
      onPress={onPress}
      disabled={!onPress && !rightElement}
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
        {rightElement}
        {onPress && !rightElement && <ChevronRight size={16} color={colors.muted} />}
      </View>
    </Pressable>
  )
}

export default function SettingsScreen() {
  const { colors, typography, spacing } = useTheme()
  const { isDark, toggle } = useThemeStore()
  const { clearHistory } = useHistoryStore()

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user.email ?? null)
      setUserName(data.session?.user.user_metadata?.full_name ?? null)
    })
  }, [])

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

  const handleLogout = () => {
    Alert.alert('Esci', 'Vuoi disconnetterti dall\'account?', [
      { text: 'Annulla', style: 'cancel' },
      {
        text: 'Esci',
        style: 'destructive',
        onPress: () => supabase.auth.signOut().then(() => router.replace('/login')),
      },
    ])
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
        {/* ACCOUNT */}
        <View style={[styles.section, { marginTop: spacing[4] }]}>
          <Text style={[typography.caption, styles.sectionLabel, { color: colors.muted }]}>
            ACCOUNT
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {userEmail ? (
              <SettingsRow
                icon={<User size={18} color={colors.muted} />}
                label={userName ?? userEmail}
                rightLabel={userEmail !== userName ? userEmail : undefined}
                isLast
                {...rowProps}
              />
            ) : (
              <SettingsRow
                icon={<LogIn size={18} color={colors.muted} />}
                label="Accedi o registrati"
                onPress={() => router.push('/login')}
                isLast
                {...rowProps}
              />
            )}
          </View>
        </View>

        {/* ASPETTO */}
        <View style={[styles.section, { marginTop: spacing[6] }]}>
          <Text style={[typography.caption, styles.sectionLabel, { color: colors.muted }]}>
            ASPETTO
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SettingsRow
              icon={<Moon size={18} color={colors.muted} />}
              label="Modalità scura"
              rightElement={<Toggle value={isDark} onToggle={toggle} />}
              isLast
              {...rowProps}
            />
          </View>
        </View>

        {/* DATI */}
        <View style={[styles.section, { marginTop: spacing[6] }]}>
          <Text style={[typography.caption, styles.sectionLabel, { color: colors.muted }]}>
            DATI
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SettingsRow
              icon={<Trash2 size={18} color={colors.destructive} />}
              label="Elimina cronologia"
              onPress={handleDeleteHistory}
              destructive
              isLast
              {...rowProps}
            />
          </View>
        </View>

        {/* INFORMAZIONI */}
        <View style={[styles.section, { marginTop: spacing[6] }]}>
          <Text style={[typography.caption, styles.sectionLabel, { color: colors.muted }]}>
            INFORMAZIONI
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
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
            <SettingsRow
              icon={<ShieldCheck size={18} color={colors.muted} />}
              label="Termini di servizio"
              onPress={() => {}}
              {...rowProps}
            />
            <SettingsRow
              icon={<ShieldCheck size={18} color={colors.muted} />}
              label="Privacy Policy"
              onPress={() => {}}
              isLast
              {...rowProps}
            />
          </View>
        </View>

        {/* LOGOUT */}
        {userEmail && (
          <View style={[styles.section, { marginTop: spacing[6] }]}>
            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <SettingsRow
                icon={<LogOut size={18} color={colors.destructive} />}
                label="Esci"
                onPress={handleLogout}
                destructive
                isLast
                {...rowProps}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
