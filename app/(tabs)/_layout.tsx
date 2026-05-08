import { BottomNav } from '@/components/layout/BottomNav/BottomNav'
import { Tabs, useRouter } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const TAB_ROUTES = ['/', '/history', '/settings'] as const

export default function TabsLayout() {
  const [activePage, setActivePage] = useState(0)
  const router = useRouter()

  const handlePageChange = (page: number) => {
    setActivePage(page)
    router.push(TAB_ROUTES[page] as any)
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
          screenListeners={{
            focus: (e) => {
              const routeName = (e.target as string)?.split('-')[0]
              const idx = ['index', 'history', 'settings'].indexOf(routeName)
              if (idx >= 0) setActivePage(idx)
            },
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="history" />
          <Tabs.Screen name="settings" />
        </Tabs>
        <BottomNav activePage={activePage} onPageChange={handlePageChange} />
      </View>
    </SafeAreaProvider>
  )
}
