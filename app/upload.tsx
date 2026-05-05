import { BottomNav } from '@/components/layout/BottomNav/BottomNav'
import { LogoWithText } from '@/components/ui/Logo/Logo'
import { UploadZone } from '@/components/upload/UploadZone'
import { useTheme } from '@/hooks/useTheme'
import { useUpload } from '@/hooks/useUpload'
import { Lock } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UploadScreen() {
  const { colors, typography, spacing } = useTheme()
  const { handlePickPdf, handleCamera, loadingPdf, loadingCamera } = useUpload()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <LogoWithText size={36} style={{ marginBottom: spacing[6] }} />
        <UploadZone
          onPickPdf={handlePickPdf}
          onCamera={handleCamera}
          loading={loadingPdf || loadingCamera}
        />
        <View style={[styles.privacyBadge, { borderColor: colors.border }]}>
          <Lock size={12} color={colors.muted} />
          <Text style={[typography.caption, { color: colors.muted }]}>
            I tuoi dati non vengono salvati
          </Text>
        </View>
      </View>
      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
    alignItems: 'center',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
})
