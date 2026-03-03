import { Badge, Button, Card } from '@/components/ui'
import { Logo, LogoWithText } from '@/components/ui/Logo/Logo'
import { colors } from '@/constants/colors'
import { useTheme } from '@/contexts/ThemeContext'
import { AlertTriangle, CheckCircle } from 'lucide-react-native'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Playground() {
  const { spacing } = useTheme()

  if (!__DEV__) return null

  return (
    <ScrollView
      contentContainerStyle={{
        padding: spacing[6],
        gap: spacing[8],
      }}
    >
      <Section title="Logo">
        <LogoWithText size={44} />
        <LogoWithText size={36} />
        <LogoWithText size={28} />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Logo size={56} />
          <Logo size={44} />
          <Logo size={36} />
          <Logo size={28} />
          <Logo size={22} />
        </View>
      </Section>

      <Section title="Buttons">
        <Button label="Primary" onPress={() => {}} />
        <Button label="Secondary" variant="secondary" onPress={() => {}} />
        <Button label="Ghost" variant="ghost" onPress={() => {}} />
        <Button label="Loading" loading onPress={() => {}} />
        <Button label="Disabled" disabled onPress={() => {}} />
        <Button label="Auto width" fullWidth={false} onPress={() => {}} />
      </Section>

      <Section title="Cards">
        <Card>
          <Text>Default Card</Text>
        </Card>
        <Card variant="surface">
          <Text>Surface Card</Text>
        </Card>
        <Card variant="warning">
          <Text>Warning Card</Text>
        </Card>
        <Card variant="success">
          <Text>Success Card</Text>
        </Card>
        <Card variant="error">
          <Text>Error Card</Text>
        </Card>
        <Card loading />
      </Section>

      <Section title="Badges">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge label="Tempo Determinato" />
          <Badge
            label="OK"
            variant="success"
            icon={<CheckCircle size={12} color={colors.success} />}
          />
          <Badge
            label="2 clausole"
            variant="warning"
            icon={<AlertTriangle size={12} color={colors.warning} />}
          />
          <Badge label="Non concorrenza" variant="error" />
          <Badge loading label="" />
        </View>
      </Section>
    </ScrollView>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const { spacing, typography } = useTheme()

  return (
    <View style={{ gap: spacing[4], width: 300 }}>
      <Text style={[typography.h2, styles.sectionTitle]}>{title}</Text>
      <View style={{ gap: spacing[3] }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
  },
})
