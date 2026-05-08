import { ToastProvider } from '@/contexts/ToastContext'
import { supabase } from '@/services/supabase'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Session } from '@supabase/supabase-js'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!fontsLoaded && !fontError) return
    if (session === undefined) return

    SplashScreen.hideAsync()

    if (session === null) {
      router.replace('/login')
    }
  }, [fontsLoaded, fontError, session])

  if (!fontsLoaded && !fontError) return null
  if (session === undefined) return null

  return (
    <ThemeProvider>
      <ToastProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="upload" />
          <Stack.Screen name="loading" />
          <Stack.Screen name="report/[id]" />
          <Stack.Screen name="negotation/[id]" />
          {__DEV__ && <Stack.Screen name="playground" />}
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  )
}
