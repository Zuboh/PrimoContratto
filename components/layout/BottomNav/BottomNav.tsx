import * as Haptics from 'expo-haptics'
import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TABS } from './BottomNav.config'
import { createStyles } from './BottomNav.styles'
import { TabButtonProps } from './BottomNav.types'

function TabButton({ icon: Icon, label, active, onPress }: TabButtonProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  const color = active ? theme.colors.primary : theme.colors.muted
  const strokeWidth = active ? 2.5 : 1.8

  return (
    <Pressable
      style={styles.tabButton}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <Icon size={22} color={color} strokeWidth={strokeWidth} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  )
}

export function BottomNav() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets.bottom)
  const router = useRouter()
  const pathname = usePathname()

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push(route as any)
  }

  return (
    <View style={styles.container}>
      {TABS.map(({ route, label, icon }) => (
        <TabButton
          key={route}
          icon={icon}
          label={label}
          active={
            route === '/'
              ? pathname === '/' ||
                pathname === '/upload' ||
                pathname === '/loading' ||
                pathname.startsWith('/report') ||
                pathname.startsWith('/negotation')
              : pathname === route || pathname.endsWith(route)
          }
          onPress={() => handlePress(route)}
        />
      ))}
    </View>
  )
}
