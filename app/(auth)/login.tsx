import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: W } = Dimensions.get('window')
const logoWidth = W * 0.52
const logoHeight = logoWidth * 0.34

export default function LoginScreen() {
  const { colors, spacing, radius, shadow } = useTheme()
  const { setUser } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const canSubmit = email.trim().length > 0 && password.length >= 1

  const handleLogin = () => {
    if (!canSubmit) return
    setUser({
      id: 'mock-' + Date.now(),
      email: email.trim(),
      name: email.split('@')[0],
      plan: 'free',
      analysesThisMonth: 0,
      createdAt: new Date().toISOString(),
    })
    router.replace('/(tabs)')
  }

  // DS §16 — well metaphor: surface2 bg at rest, no border
  const fieldStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface2,
    borderRadius: radius.sm,       // r-sm: 14px
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    minHeight: 52,
  }

  const inputTextStyle = {
    flex: 1,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
    color: colors.foreground,
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing[6],
            paddingVertical: spacing[8],
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Card */}
          <View
            style={[
              {
                width: '100%',
                maxWidth: 400,
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                padding: spacing[6],
                gap: spacing[5],
              },
              shadow.md,
            ]}
          >
            {/* Wordmark */}
            <View style={{ alignItems: 'center', gap: spacing[1] }}>
              <Image
                source={require('@/assets/images/logo-wordmark.png')}
                style={{ width: logoWidth, height: logoHeight }}
                resizeMode="contain"
              />
            </View>

            {/* Fields */}
            <View style={{ gap: spacing[4] }}>
              {/* Label + Email */}
              <View style={{ gap: spacing[2] }}>
                <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.foreground }}>
                  Email
                </Text>
                <View style={fieldStyle}>
                  <Mail size={20} color={colors.muted} strokeWidth={1.8} />
                  <TextInput
                    style={inputTextStyle}
                    placeholder="nome@esempio.it"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Label + Password */}
              <View style={{ gap: spacing[2] }}>
                <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.foreground }}>
                  Password
                </Text>
                <View style={fieldStyle}>
                  <Lock size={20} color={colors.muted} strokeWidth={1.8} />
                  <TextInput
                    style={inputTextStyle}
                    placeholder="••••••••"
                    placeholderTextColor={colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                    {showPassword
                      ? <EyeOff size={20} color={colors.muted} strokeWidth={1.8} />
                      : <Eye size={20} color={colors.muted} strokeWidth={1.8} />}
                  </Pressable>
                </View>

                {/* Forgot password */}
                <Pressable style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ fontSize: 13, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>
                    Password dimenticata?
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Primary CTA */}
            <Pressable
              onPress={handleLogin}
              disabled={!canSubmit}
              style={{
                backgroundColor: canSubmit ? colors.primary : colors.surface3,
                borderRadius: radius.full,
                paddingVertical: 14,
                alignItems: 'center',
                ...shadow.button,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: canSubmit ? colors.primaryForeground : colors.muted }}>
                Accedi
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={{ fontSize: 12, fontFamily: 'Quicksand_400Regular', color: colors.muted }}>
                oppure continua con
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            {/* Google */}
            <Pressable
              style={{
                borderWidth: 1.5,
                borderColor: colors.border,
                borderRadius: radius.full,
                paddingVertical: 14,
                alignItems: 'center',
                backgroundColor: colors.surface,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: colors.foreground }}>
                Continua con Google
              </Text>
            </Pressable>

            {/* Register link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Quicksand_400Regular', color: colors.muted }}>
                Non hai un account?
              </Text>
              <Pressable onPress={() => router.push('/(auth)/register')}>
                <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>
                  Registrati
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
