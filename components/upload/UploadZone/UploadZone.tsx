import { Logo } from '@/components/ui/Logo/Logo'
import { useTheme } from '@/hooks/useTheme'
import { Camera, FileText } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { createStyles } from './UploadZone.styles'
import { UploadZoneProps } from './UploadZone.types'

export function UploadZone({
  onPickPdf,
  onCamera,
  loading = false,
  style,
}: UploadZoneProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[{ width: '100%', alignItems: 'center' }, style]}>
      <Pressable
        style={({ pressed }) => [styles.zone, pressed && styles.zonePressed]}
        onPress={onPickPdf}
        disabled={loading}
      >
        <View style={styles.iconWrapper}>
          <Logo size={56} />
        </View>
        <Text style={styles.title}>Tocca per caricare il file</Text>
        <Text style={styles.subtitle}>o fai una foto al contratto</Text>
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={onPickPdf}>
            <FileText size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={styles.actionBtnText}>PDF</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onCamera}>
            <Camera size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={styles.actionBtnText}>Foto</Text>
          </Pressable>
        </View>
      </Pressable>
      <Text style={styles.hint}>PDF, JPG, PNG fino a 10MB</Text>
    </View>
  )
}
