import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'
import { Logo, LogoWithText } from '@/components/ui/Logo/Logo'
import { Skeleton, SkeletonRow } from '@/components/ui/Skeleton/Skeleton'
import { Spinner } from '@/components/ui/Spinner'
import { useToastContext } from '@/contexts/ToastContext'
import { useTheme } from '@/hooks/useTheme'
import { Redirect } from 'expo-router'
import React from 'react'
import { Platform, ScrollView, Text, View } from 'react-native'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ marginBottom: spacing[10] }}>
      <Text style={{ fontSize: 11, fontFamily: 'Nunito_700Bold', letterSpacing: 1.2, textTransform: 'uppercase', color: colors.muted, marginBottom: spacing[4] }}>
        {title}
      </Text>
      <View style={{ height: 1, backgroundColor: colors.border, marginBottom: spacing[5] }} />
      {children}
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[3], borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing[4], flexWrap: 'wrap' }}>
      <Text style={{ fontSize: 12, fontFamily: 'Nunito_600SemiBold', color: colors.muted, width: 100, flexShrink: 0 }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3], flexWrap: 'wrap', flex: 1 }}>
        {children}
      </View>
    </View>
  )
}

function ComingSoon({ title, spec }: { title: string; spec: string }) {
  const { colors, spacing, radius } = useTheme()
  return (
    <View style={{ backgroundColor: colors.surfaceAlt, borderRadius: radius.lg, padding: spacing[4], borderWidth: 1.5, borderColor: colors.border, borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
      <Text style={{ fontSize: 22 }}>🔧</Text>
      <View>
        <Text style={{ fontSize: 14, fontFamily: 'Nunito_700Bold', color: colors.foreground }}>{title}</Text>
        <Text style={{ fontSize: 12, fontFamily: 'Nunito_400Regular', color: colors.muted, marginTop: 2 }}>
          In costruzione · Design System {spec}
        </Text>
      </View>
    </View>
  )
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  const { colors } = useTheme()
  return (
    <View style={{ alignItems: 'center', width: 80, marginBottom: 16 }}>
      <View style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: hex, borderWidth: 1, borderColor: colors.border, marginBottom: 6 }} />
      <Text style={{ fontSize: 10, fontFamily: 'Nunito_600SemiBold', color: colors.foreground, textAlign: 'center' }}>{name}</Text>
      <Text style={{ fontSize: 9, fontFamily: 'Nunito_400Regular', color: colors.muted, textAlign: 'center' }}>{hex}</Text>
    </View>
  )
}

function SwatchGroup({ title, swatches }: { title: string; swatches: { name: string; hex: string }[] }) {
  const { colors, spacing } = useTheme()
  return (
    <View style={{ marginBottom: spacing[5] }}>
      <Text style={{ fontSize: 11, fontFamily: 'Nunito_700Bold', color: colors.muted, marginBottom: spacing[3] }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {swatches.map((s) => <Swatch key={s.name} {...s} />)}
      </View>
    </View>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PlaygroundScreen() {
  const { colors, spacing, radius, shadow } = useTheme()
  const toast = useToastContext()

  if (Platform.OS !== 'web') return <Redirect href="/(tabs)" />

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ maxWidth: 900, width: '100%', alignSelf: 'center', paddingHorizontal: 48, paddingTop: 64, paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ marginBottom: spacing[10] }}>
        <LogoWithText size={32} style={{ marginBottom: spacing[5] }} />
        <Text style={{ fontSize: 36, fontFamily: 'Nunito_800ExtraBold', color: colors.foreground, letterSpacing: -0.5 }}>
          Design System
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Nunito_400Regular', color: colors.muted, marginTop: 6 }}>
          Componenti, tokens e pattern dell'app Primo.
        </Text>
        <View style={{ height: 1, backgroundColor: colors.border, marginTop: spacing[6] }} />
      </View>

      {/* 01 · Colors */}
      <Section title="01 · Colors">
        <SwatchGroup title="Sage (Primary)" swatches={[
          { name: 'sage-900', hex: '#3F5A45' },
          { name: 'sage-700', hex: '#4F6B4A' },
          { name: 'sage-600', hex: '#5F8D76' },
          { name: 'sage-300', hex: '#BFCEBA' },
          { name: 'sage-100', hex: '#DCE5D1' },
          { name: 'sage-50', hex: '#E8EEDC' },
        ]} />
        <SwatchGroup title="Backgrounds" swatches={[
          { name: 'bg (#F5ECDC)', hex: '#F5ECDC' },
          { name: 'bg-2 (#F1E7D4)', hex: '#F1E7D4' },
          { name: 'surface (#FBF6EA)', hex: '#FBF6EA' },
          { name: 'surface-2 (#EFE6D2)', hex: '#EFE6D2' },
          { name: 'surface-3 (#E8E0CC)', hex: '#E8E0CC' },
        ]} />
        <SwatchGroup title="Ink / Text" swatches={[
          { name: 'ink (#1A1A1A)', hex: '#1A1A1A' },
          { name: 'ink-2 (#2C2A26)', hex: '#2C2A26' },
          { name: 'muted (#6F6A60)', hex: '#6F6A60' },
          { name: 'muted-2 (#9A938A)', hex: '#9A938A' },
        ]} />
        <SwatchGroup title="Status" swatches={[
          { name: 'success (#5F8D76)', hex: '#5F8D76' },
          { name: 'successLight (#DCE5D1)', hex: '#DCE5D1' },
          { name: 'warn (#E29A4B)', hex: '#E29A4B' },
          { name: 'warnSoft (#F5C994)', hex: '#F5C994' },
          { name: 'danger (#C8624A)', hex: '#C8624A' },
          { name: 'dangerLight (#F9E4DF)', hex: '#F9E4DF' },
          { name: 'info (#7B8FB8)', hex: '#7B8FB8' },
        ]} />
      </Section>

      {/* 02 · Typography */}
      <Section title="02 · Typography">
        {([
          ['display', 'display · 40px/800', { fontSize: 40, fontFamily: 'Nunito_800ExtraBold', letterSpacing: -0.8, lineHeight: 48 }],
          ['h1', 'h1 · 30px/800', { fontSize: 30, fontFamily: 'Nunito_800ExtraBold', letterSpacing: -0.45, lineHeight: 36 }],
          ['h2', 'h2 · 22px/800', { fontSize: 22, fontFamily: 'Nunito_800ExtraBold', letterSpacing: -0.22, lineHeight: 28 }],
          ['h3', 'h3 · 18px/700', { fontSize: 18, fontFamily: 'Nunito_700Bold', lineHeight: 24 }],
          ['h4', 'h4 · 16px/700', { fontSize: 16, fontFamily: 'Nunito_700Bold', lineHeight: 22 }],
          ['body', 'body · 16px/400', { fontSize: 16, fontFamily: 'Nunito_400Regular', lineHeight: 24 }],
          ['body2', 'body2 · 14px/400', { fontSize: 14, fontFamily: 'Nunito_400Regular', lineHeight: 20 }],
          ['label', 'label · 16px/600', { fontSize: 16, fontFamily: 'Nunito_600SemiBold', lineHeight: 22 }],
          ['labelSm', 'labelSm · 14px/600', { fontSize: 14, fontFamily: 'Nunito_600SemiBold', lineHeight: 20 }],
          ['caption', 'caption · 12px/700 UPPERCASE', { fontSize: 12, fontFamily: 'Nunito_700Bold', letterSpacing: 2.16, textTransform: 'uppercase' as const, lineHeight: 16 }],
          ['overline', 'overline · 11px/600 UPPERCASE', { fontSize: 11, fontFamily: 'Nunito_600SemiBold', letterSpacing: 0.8, textTransform: 'uppercase' as const }],
          ['number', 'number · 38px/700 Inter', { fontSize: 38, fontFamily: 'Inter_700Bold', letterSpacing: -0.76, lineHeight: 44 }],
          ['numberSm', 'numberSm · 24px/700 Inter', { fontSize: 24, fontFamily: 'Inter_700Bold', letterSpacing: -0.48, lineHeight: 30 }],
          ['brand', 'brand · 26px/800', { fontSize: 26, fontFamily: 'Nunito_800ExtraBold', letterSpacing: -0.26 }],
        ] as [string, string, object][]).map(([key, label, style]) => (
          <View key={key} style={{ flexDirection: 'row', alignItems: 'baseline', paddingVertical: spacing[3], borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing[5] }}>
            <Text style={{ fontSize: 11, fontFamily: 'Nunito_600SemiBold', color: colors.muted, width: 140, flexShrink: 0 }}>{label}</Text>
            <Text style={[{ color: colors.foreground, flex: 1 }, style]}>Il tuo stipendio, spiegato bene.</Text>
          </View>
        ))}
      </Section>

      {/* 03 · Radius */}
      <Section title="03 · Border Radius">
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: spacing[5], flexWrap: 'wrap' }}>
          {([['xs', 10], ['sm', 14], ['md', 18], ['lg', 24], ['xl', 28], ['full', 999]] as [string, number][]).map(([name, val]) => (
            <View key={name} style={{ alignItems: 'center', gap: spacing[2] }}>
              <View style={{ width: 64, height: 64, borderRadius: Math.min(val, 32), backgroundColor: colors.primaryLight, borderWidth: 1.5, borderColor: colors.primary }} />
              <Text style={{ fontSize: 11, fontFamily: 'Nunito_600SemiBold', color: colors.muted }}>{name}</Text>
              <Text style={{ fontSize: 10, fontFamily: 'Nunito_400Regular', color: colors.muted }}>{val >= 999 ? 'pill' : `${val}px`}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* 04 · Shadows */}
      <Section title="04 · Shadows">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[5] }}>
          {(['sm', 'md', 'lg', 'button', 'fab'] as const).map((key) => (
            <View key={key} style={[{ width: 110, height: 72, borderRadius: radius.lg, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }, shadow[key]]}>
              <Text style={{ fontSize: 11, fontFamily: 'Nunito_700Bold', color: colors.muted }}>shadow.{key}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* 05 · Logo */}
      <Section title="05 · Logo">
        <Row label="Logo">
          <Logo size={24} />
          <Logo size={36} />
          <Logo size={48} />
          <Logo size={64} />
        </Row>
        <Row label="LogoWithText">
          <LogoWithText size={20} />
          <LogoWithText size={28} />
          <LogoWithText size={36} />
        </Row>
      </Section>

      {/* 06 · Illustration */}
      <Section title="06 · Illustration Placeholder">
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: spacing[6] }}>
          {([['sm', 80], ['md', 140], ['lg', 200]] as [any, number][]).map(([size, px]) => (
            <View key={size} style={{ alignItems: 'center', gap: spacing[2] }}>
              <IllustrationPlaceholder size={size} />
              <Text style={{ fontSize: 11, fontFamily: 'Nunito_600SemiBold', color: colors.muted }}>{size} · {px}px</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* 07 · Buttons */}
      <Section title="07 · Buttons">
        <Row label="Variants">
          <Button label="Primary" onPress={() => {}} fullWidth={false} />
          <Button label="Secondary" variant="secondary" onPress={() => {}} fullWidth={false} />
          <Button label="Ghost" variant="ghost" onPress={() => {}} fullWidth={false} />
        </Row>
        <Row label="States">
          <Button label="Loading" onPress={() => {}} loading fullWidth={false} />
          <Button label="Disabled" onPress={() => {}} disabled fullWidth={false} />
        </Row>
        <Row label="Full width">
          <Button label="Full width primary" onPress={() => {}} />
        </Row>
      </Section>

      {/* 08 · Badges */}
      <Section title="08 · Badges">
        <Row label="Variants">
          <Badge label="Default" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
        </Row>
        <Row label="Loading">
          <Badge label="Loading" loading />
        </Row>
      </Section>

      {/* 09 · Cards */}
      <Section title="09 · Cards">
        <View style={{ gap: spacing[3] }}>
          {(['default', 'hero', 'surface', 'success', 'warning', 'error'] as const).map((variant) => (
            <Card key={variant} variant={variant}>
              <Text style={{ fontSize: 14, fontFamily: 'Nunito_700Bold', color: colors.foreground, marginBottom: 4 }}>Card · {variant}</Text>
              <Text style={{ fontSize: 13, fontFamily: 'Nunito_400Regular', color: colors.muted }}>Il tuo stipendio, spiegato bene.</Text>
            </Card>
          ))}
          <Card loading><Text>Loading</Text></Card>
        </View>
      </Section>

      {/* 10 · Skeleton */}
      <Section title="10 · Skeleton">
        <View style={{ gap: spacing[4] }}>
          <SkeletonRow gap={12}>
            <Skeleton width={40} height={40} borderRadius={20} />
            <View style={{ gap: 8, flex: 1 }}>
              <Skeleton width="70%" height={14} />
              <Skeleton width="40%" height={12} />
            </View>
          </SkeletonRow>
          <Skeleton width="100%" height={80} />
          <SkeletonRow gap={12}>
            <Skeleton width="30%" height={20} />
            <Skeleton width="30%" height={20} />
            <Skeleton width="30%" height={20} />
          </SkeletonRow>
        </View>
      </Section>

      {/* 11 · Spinner */}
      <Section title="11 · Spinner">
        <Row label="Sizes">
          {([16, 24, 32] as const).map((sz) => (
            <View key={sz} style={{ alignItems: 'center', gap: 6 }}>
              <Spinner size={sz} />
              <Text style={{ fontSize: 10, fontFamily: 'Nunito_400Regular', color: colors.muted }}>{sz}px</Text>
            </View>
          ))}
        </Row>
        <Row label="Colors">
          <Spinner size={24} color={colors.primary} />
          <Spinner size={24} color={colors.success} />
          <Spinner size={24} color={colors.warning} />
          <Spinner size={24} color={colors.destructive} />
        </Row>
      </Section>

      {/* 12 · Toast */}
      <Section title="12 · Toast">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] }}>
          <Button label="✓ Success" variant="secondary" onPress={() => toast.success('Analisi completata!')} fullWidth={false} />
          <Button label="✕ Error" variant="secondary" onPress={() => toast.error('Errore nel caricamento.')} fullWidth={false} />
          <Button label="⚠ Warning" variant="secondary" onPress={() => toast.warning('Controlla il cedolino.')} fullWidth={false} />
          <Button label="ℹ Info" variant="secondary" onPress={() => toast.info('Nuovo cedolino disponibile.')} fullWidth={false} />
        </View>
      </Section>

      {/* In Costruzione */}
      <Section title="In Costruzione 🔧">
        <View style={{ gap: spacing[3] }}>
          <ComingSoon title="Form Inputs — TextField, Select, Textarea" spec="§16" />
          <ComingSoon title="Bottom Sheet / Modal" spec="§14" />
          <ComingSoon title="Empty State" spec="§12" />
          <ComingSoon title="Checkbox · Radio · Toggle" spec="§16.4" />
        </View>
      </Section>
    </ScrollView>
  )
}
