import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const { colors, typography, spacing, radius, shadow, fontFamily } = useTheme()
  const { setUser } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const canSubmit = email.trim().length > 0 && password.length > 0

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

  const inputStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    paddingHorizontal: spacing[3],
    height: 48,
    gap: spacing[2],
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
            padding: spacing[6],
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card */}
          <View
            style={[
              {
                width: '100%',
                maxWidth: 380,
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                padding: spacing[6],
                gap: spacing[5],
                borderWidth: 1,
                borderColor: colors.border,
              },
              shadow.md,
            ]}
          >
            {/* Wordmark */}
            <View style={{ alignItems: 'center', gap: spacing[1] }}>
              <Text
                style={{
                  fontFamily: fontFamily.extraBold,
                  fontSize: 28,
                  color: colors.foreground,
                }}
              >
                Primo
              </Text>
              <Text style={[typography.body, { color: colors.muted, textAlign: 'center' }]}>
                Il tuo assistente per il lavoro
              </Text>
            </View>

            {/* Fields */}
            <View style={{ gap: spacing[3] }}>
              {/* Email */}
              <View style={inputStyle}>
                <Mail size={16} color={colors.muted} />
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: fontFamily.regular,
                    fontSize: 14,
                    color: colors.foreground,
                  }}
                  placeholder="Email"
                  placeholderTextColor={colors.placeholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password */}
              <View style={inputStyle}>
                <Lock size={16} color={colors.muted} />
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: fontFamily.regular,
                    fontSize: 14,
                    color: colors.foreground,
                  }}
                  placeholder="Password"
                  placeholderTextColor={colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                  {showPassword
                    ? <EyeOff size={16} color={colors.muted} />
                    : <Eye size={16} color={colors.muted} />}
                </Pressable>
              </View>

              {/* Forgot password */}
              <Pressable style={{ alignSelf: 'flex-end' }}>
                <Text style={[typography.caption, { color: colors.primary }]}>
                  Password dimenticata?
                </Text>
              </Pressable>
            </View>

            {/* Primary CTA */}
            <Pressable
              onPress={handleLogin}
              style={{
                backgroundColor: canSubmit ? colors.primary : colors.border,
                borderRadius: radius.full,
                paddingVertical: spacing[4],
                alignItems: 'center',
                opacity: canSubmit ? 1 : 0.6,
              }}
              disabled={!canSubmit}
            >
              <Text style={[typography.label, { color: colors.primaryForeground }]}>
                Accedi
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <Text style={[typography.caption, { color: colors.muted }]}>oppure</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            {/* Google */}
            <Pressable
              style={{
                borderWidth: 2,
                borderColor: colors.border,
                borderRadius: radius.full,
                paddingVertical: spacing[3],
                alignItems: 'center',
              }}
            >
              <Text style={[typography.label, { color: colors.foreground }]}>
                Continua con Google
              </Text>
            </Pressable>

            {/* Register link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={[typography.caption, { color: colors.muted }]}>
                Non hai un account?
              </Text>
              <Pressable onPress={() => router.push('/(auth)/register')}>
                <Text style={[typography.caption, { color: colors.primary, fontFamily: fontFamily.semiBold }]}>
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
