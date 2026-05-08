import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks/useTheme'
import { TABS } from './BottomNav.config'
import { createStyles } from './BottomNav.styles'
import { BottomNavProps, FabButtonProps, TabButtonProps } from './BottomNav.types'

function TabButton({ icon: Icon, label, active, onPress }: TabButtonProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets.bottom)

  const color = active ? theme.colors.primary : theme.colors.muted
  const fontWeight = active ? '600' : '400'

  return (
    <Pressable
      style={styles.tabButton}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      {active && <View style={styles.activeIndicator} />}
      <Icon size={22} color={color} strokeWidth={active ? 2.5 : 1.8} />
      <Text style={[styles.label, { color, fontWeight }]}>{label}</Text>
    </Pressable>
  )
}

function FabButton({ onPress }: FabButtonProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets.bottom)

  return (
    <View style={styles.fabSlot}>
      <Pressable
        style={styles.fabButton}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Carica documento"
      >
        <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
      </Pressable>
    </View>
  )
}

export function BottomNav({ activePage, onPageChange }: BottomNavProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets.bottom)
  const router = useRouter()

  const handleTabPress = (pageIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPageChange(pageIndex)
  }

  const handleFabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push('/upload')
  }

  const leftTabs = TABS.slice(0, 2)
  const rightTabs = TABS.slice(2)

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {leftTabs.map(({ label, icon, pageIndex }) => (
          <TabButton
            key={label}
            icon={icon}
            label={label}
            active={activePage === pageIndex}
            onPress={() => handleTabPress(pageIndex)}
          />
        ))}

        <FabButton onPress={handleFabPress} />

        {rightTabs.map(({ label, icon, pageIndex }) => (
          <TabButton
            key={label}
            icon={icon}
            label={label}
            active={activePage === pageIndex}
            onPress={() => handleTabPress(pageIndex)}
          />
        ))}
      </View>
    </View>
  )
}
