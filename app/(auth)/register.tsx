import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native'
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

export default function RegisterScreen() {
  const { colors, typography, spacing, radius, shadow, fontFamily } = useTheme()
  const { setUser } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordStrong = password.length >= 8
  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && passwordStrong && agreed

  const handleRegister = () => {
    if (!canSubmit) return
    setUser({
      id: 'mock-' + Date.now(),
      email: email.trim(),
      name: name.trim(),
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
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
              <Pressable onPress={() => router.back()} hitSlop={8}>
                <ArrowLeft size={20} color={colors.foreground} />
              </Pressable>
              <Text style={[typography.h2, { color: colors.foreground }]}>Crea account</Text>
            </View>

            {/* Fields */}
            <View style={{ gap: spacing[4] }}>
              {/* Name */}
              <View style={inputStyle}>
                <User size={16} color={colors.muted} />
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: fontFamily.regular,
                    fontSize: 14,
                    color: colors.foreground,
                  }}
                  placeholder="Nome"
                  placeholderTextColor={colors.placeholder}
                  value={name}
                  onChangeText={setName}
                  autoCorrect={false}
                />
              </View>

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
              <View style={{ gap: spacing[1] }}>
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
                <Text
                  style={[
                    typography.caption,
                    { color: passwordStrong ? colors.primary : colors.muted },
                  ]}
                >
                  Almeno 8 caratteri
                </Text>
              </View>
            </View>

            {/* Terms checkbox */}
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}
              onPress={() => setAgreed((v) => !v)}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: radius.sm / 2,
                  borderWidth: 2,
                  borderColor: agreed ? colors.primary : colors.border,
                  backgroundColor: agreed ? colors.primary : colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {agreed && (
                  <Text style={{ color: colors.primaryForeground, fontSize: 12, fontFamily: fontFamily.bold }}>
                    ✓
                  </Text>
                )}
              </View>
              <Text style={[typography.caption, { color: colors.muted, flex: 1 }]}>
                Accetto i termini di servizio
              </Text>
            </Pressable>

            {/* Register CTA */}
            <Pressable
              onPress={handleRegister}
              disabled={!canSubmit}
              style={{
                backgroundColor: canSubmit ? colors.primary : colors.border,
                borderRadius: radius.full,
                paddingVertical: spacing[4],
                alignItems: 'center',
                opacity: canSubmit ? 1 : 0.6,
              }}
            >
              <Text style={[typography.label, { color: colors.primaryForeground }]}>
                Registrati
              </Text>
            </Pressable>

            {/* Login link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={[typography.caption, { color: colors.muted }]}>
                Hai già un account?
              </Text>
              <Pressable onPress={() => router.back()}>
                <Text style={[typography.caption, { color: colors.primary, fontFamily: fontFamily.semiBold }]}>
                  Accedi
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
