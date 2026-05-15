import { BottomNav } from '@/components/layout/BottomNav/index'
import { useTheme } from '@/hooks/useTheme'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const { colors } = useTheme()

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            lazy: false,
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="history" />
          <Tabs.Screen name="settings" />
        </Tabs>
        <BottomNav />
      </View>
    </SafeAreaProvider>
  )
}
