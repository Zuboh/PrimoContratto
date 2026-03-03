// app/index.tsx

import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo/Logo'
import { useTheme } from '@/contexts/ThemeContext'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function WorkInProgress() {
  const { colors, typography, spacing, radius } = useTheme()

  const IS_DEV = __DEV__

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            borderColor: colors.border,
            padding: spacing[8],
            gap: spacing[5],
          },
        ]}
      >
        <View style={styles.center}>
          <Logo size={64} />
        </View>

        <View
          style={[
            styles.wipBadge,
            {
              backgroundColor: colors.warningLight,
              borderColor: colors.warningBorder,
              borderRadius: radius.full,
              paddingVertical: spacing[1],
              paddingHorizontal: spacing[4],
            },
          ]}
        >
          <Text
            style={{ fontSize: 12, fontWeight: '600', color: colors.warning }}
          >
            🚧 Work in Progress
          </Text>
        </View>

        <View style={{ gap: spacing[2] }}>
          <Text
            style={[
              typography.h2,
              { color: colors.foreground, textAlign: 'center' },
            ]}
          >
            PrimoContratto
          </Text>
          {IS_DEV && (
            <Text
              style={[
                typography.body,
                { color: colors.muted, textAlign: 'center', lineHeight: 20 },
              ]}
            >
              L&apos;app è in costruzione.{'\n'}
              Dai un&apos;occhiata ai componenti UI.
            </Text>
          )}
        </View>
        {IS_DEV && (
          <Button
            label="Apri Playground"
            onPress={() => router.push('/playground')}
          />
        )}
      </View>

      <Text
        style={[
          typography.caption,
          { color: colors.muted, marginTop: spacing[6] },
        ]}
      >
        v1.0.0 · Solo in __DEV__
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  center: {
    alignItems: 'center',
  },
  wipBadge: {
    borderWidth: 1,
    alignSelf: 'center',
  },
})
