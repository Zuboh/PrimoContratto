import { UploadZone } from '@/components/upload/UploadZone'
import { useTheme } from '@/hooks/useTheme'
import { useUpload } from '@/hooks/useUpload'
import { DocumentType } from '@/stores/pendingUpload'
import { useRouter } from 'expo-router'
import { ArrowLeft, Banknote, FileText, Lock } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface TypeButtonProps {
  icon: React.ReactNode
  label: string
  sublabel: string
  selected: boolean
  onPress: () => void
}

function TypeButton({ icon, label, sublabel, selected, onPress }: TypeButtonProps) {
  const { colors, typography, radius } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.typeButton,
        {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderRadius: radius.md,
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={styles.typeButtonIcon}>{icon}</View>
      <View>
        <Text
          style={[
            typography.label,
            { color: selected ? colors.primaryForeground : colors.foreground },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            typography.caption,
            { color: selected ? colors.primaryForeground : colors.muted, marginTop: 2 },
          ]}
        >
          {sublabel}
        </Text>
      </View>
    </Pressable>
  )
}

export default function UploadScreen() {
  const { colors, typography, spacing } = useTheme()
  const { handlePickPdf, handleCamera, loadingPdf, loadingCamera } = useUpload()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<DocumentType>('contratto')

  const iconColor = (selected: boolean) =>
    selected ? colors.primaryForeground : colors.primary

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={[
          styles.header,
          { borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Indietro"
        >
          <ArrowLeft size={20} color={colors.muted} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.foreground }]}>Nuovo documento</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { gap: spacing[6] }]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text
            style={[
              typography.overline,
              { color: colors.muted, marginBottom: spacing[3] },
            ]}
          >
            Cosa stai analizzando?
          </Text>
          <View style={[styles.typeRow, { gap: spacing[3] }]}>
            <TypeButton
              icon={<FileText size={24} color={iconColor(selectedType === 'contratto')} />}
              label="Contratto"
              sublabel="Lavoro"
              selected={selectedType === 'contratto'}
              onPress={() => setSelectedType('contratto')}
            />
            <TypeButton
              icon={<Banknote size={24} color={iconColor(selectedType === 'busta_paga')} />}
              label="Busta Paga"
              sublabel="Mensile"
              selected={selectedType === 'busta_paga'}
              onPress={() => setSelectedType('busta_paga')}
            />
          </View>
        </View>

        <UploadZone
          onPickPdf={() => handlePickPdf(selectedType)}
          onCamera={() => handleCamera(selectedType)}
          loading={loadingPdf || loadingCamera}
        />

        <View style={styles.privacyBadge}>
          <Lock size={12} color={colors.muted} />
          <Text style={[typography.caption, { color: colors.muted }]}>
            I tuoi dati non vengono salvati
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  typeRow: {
    flexDirection: 'row',
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1.5,
    gap: 12,
  },
  typeButtonIcon: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
})
