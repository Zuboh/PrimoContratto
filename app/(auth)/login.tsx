import { useTheme } from '@/hooks/useTheme'
import { useAuthStore } from '@/stores/authStore'
import { router } from 'expo-router'
import { Eye, EyeOff, Lock, Mail, Shield, User } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

const { width: W } = Dimensions.get('window')
const logoWidth = W * 0.52
const logoHeight = logoWidth * 0.34
const pandaSize = W * 0.28

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
  )
}

type Tab = 'login' | 'register'

export default function AuthScreen() {
  const { colors, typography, spacing, radius, shadow } = useTheme()
  const { setUser } = useAuthStore()
  const insets = useSafeAreaInsets()

  const [tab, setTab] = useState<Tab>('login')

  // shared
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // register-only
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordStrong = password.length >= 8
  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword

  const canSubmitLogin = email.trim().length > 0 && password.length >= 1
  const canSubmitRegister = name.trim().length > 0 && email.trim().length > 0 && passwordStrong && passwordMatch
  const canSubmit = tab === 'login' ? canSubmitLogin : canSubmitRegister

  const handleSubmit = () => {
    if (!canSubmit) return
    const id = 'mock-' + Date.now()
    if (tab === 'login') {
      setUser({ id, email: email.trim(), name: email.split('@')[0], plan: 'free', analysesThisMonth: 0, createdAt: new Date().toISOString() })
    } else {
      setUser({ id, email: email.trim(), name: name.trim(), plan: 'free', analysesThisMonth: 0, createdAt: new Date().toISOString() })
    }
    router.replace('/(tabs)')
  }

  const handleTabSwitch = (t: Tab) => {
    setTab(t)
    setPassword('')
    setShowPassword(false)
    setConfirmPassword('')
    setShowConfirmPassword(false)
  }

  const fieldStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface2,
    borderRadius: radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  }

  const inputTextStyle = {
    flex: 1,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
    color: colors.foreground,
  }

  const labelStyle = {
    fontSize: 12,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.foreground,
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>

        {/* Header — logo + tagline */}
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing[6], backgroundColor: colors.background }}>
          <Image
            source={require('@/assets/images/logo-wordmark.png')}
            style={{ width: logoWidth, height: logoHeight }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 13, fontFamily: 'Quicksand_400Regular', color: colors.primary, marginTop: spacing[1] }}>
            Il tuo stipendio, spiegato bene
          </Text>
        </View>

        {/* Card wrapper — relative so panda can hang above */}
        <View style={{ flex: 8, position: 'relative', overflow: 'visible' }}>

          {/* Panda — hangs from card top edge */}
          <Image
            source={require('@/assets/images/panda-login.png')}
            style={{
              position: 'absolute',
              top: -(pandaSize * 0.75),
              right: spacing[4],
              width: pandaSize,
              height: pandaSize,
              zIndex: 10,
            }}
            resizeMode="contain"
          />

          {/* Card */}
          <View style={{ flex: 1, backgroundColor: colors.surface, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, elevation: 8 }}>

            {/* Heading — fixed outside ScrollView, same position on both tabs */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: spacing[6],
              paddingTop: tab === 'login' ? pandaSize * 0.35 + spacing[3] : pandaSize * 0.35 + spacing[3],
              paddingBottom: spacing[4],
            }}>
              <View style={{ gap: spacing[1] }}>
                <Text style={{ fontSize: 22, fontFamily: 'Quicksand_700Bold', color: colors.foreground }}>
                  {tab === 'login' ? 'Benvenuto! 👋' : 'Crea il tuo account'}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'Quicksand_400Regular', color: tab === 'login' ? colors.muted : colors.primary }}>
                  {tab === 'login' ? 'Accedi al tuo account' : 'Inizia a capire davvero il tuo stipendio'}
                </Text>
              </View>
            </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: spacing[6],
              paddingBottom: spacing[6],
              gap: spacing[5],
            }}
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Form fields */}
            <View style={{ gap: spacing[3] }}>

              {/* Nome — register only */}
              {tab === 'register' && (
                <View style={{ gap: 4 }}>
                  <Text style={labelStyle}>Nome</Text>
                  <View style={fieldStyle}>
                    <User size={20} color={colors.muted} strokeWidth={1.8} />
                    <TextInput
                      style={inputTextStyle}
                      placeholder="es. Alessandro"
                      placeholderTextColor={colors.placeholder}
                      value={name}
                      onChangeText={setName}
                      autoCorrect={false}
                    />
                  </View>
                </View>
              )}

              {/* Email */}
              <View style={{ gap: 4 }}>
                <Text style={labelStyle}>Email</Text>
                <View style={fieldStyle}>
                  <Mail size={20} color={colors.muted} strokeWidth={1.8} />
                  <TextInput
                    style={inputTextStyle}
                    placeholder="es. alex@email.com"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={{ gap: 4 }}>
                <Text style={labelStyle}>Password</Text>
                <View style={fieldStyle}>
                  <Lock size={20} color={colors.muted} strokeWidth={1.8} />
                  <TextInput
                    style={inputTextStyle}
                    placeholder={tab === 'login' ? 'Inserisci la tua password' : 'Password'}
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
                {tab === 'register' && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Shield size={13} color={passwordStrong ? colors.primary : colors.muted} strokeWidth={1.8} />
                    <Text style={[typography.caption, { color: passwordStrong ? colors.primary : colors.muted }]}>
                      Minimo 8 caratteri
                    </Text>
                  </View>
                )}
                {tab === 'login' && (
                  <Pressable style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 13, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>
                      Password dimenticata?
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Ripeti password — register only */}
              {tab === 'register' && (
                <View style={{ gap: 4 }}>
                  <Text style={labelStyle}>Ripeti password</Text>
                  <View style={fieldStyle}>
                    <Lock size={20} color={colors.muted} strokeWidth={1.8} />
                    <TextInput
                      style={inputTextStyle}
                      placeholder="Ripeti la password"
                      placeholderTextColor={colors.placeholder}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <Pressable onPress={() => setShowConfirmPassword((v) => !v)} hitSlop={8}>
                      {showConfirmPassword
                        ? <EyeOff size={20} color={colors.muted} strokeWidth={1.8} />
                        : <Eye size={20} color={colors.muted} strokeWidth={1.8} />}
                    </Pressable>
                  </View>
                  {confirmPassword.length > 0 && !passwordMatch && (
                    <Text style={[typography.caption, { color: colors.danger }]}>
                      Le password non corrispondono
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Divider + Google — login only */}
            {tab === 'login' && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing[3] }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                  <Text style={{ fontSize: 12, fontFamily: 'Quicksand_400Regular', color: colors.muted }}>
                    oppure continua con
                  </Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                </View>

                <Pressable
                  style={{
                    borderWidth: 1.5,
                    borderColor: colors.border,
                    borderRadius: radius.full,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    backgroundColor: colors.surface,
                  }}
                >
                  <GoogleIcon size={20} />
                  <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: colors.foreground }}>
                    Continua con Google
                  </Text>
                </Pressable>
              </>
            )}

            {/* Bottom switch link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Quicksand_400Regular', color: colors.muted }}>
                {tab === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
              </Text>
              <Pressable onPress={() => handleTabSwitch(tab === 'login' ? 'register' : 'login')} hitSlop={8}>
                <Text style={{ fontSize: 14, fontFamily: 'Quicksand_600SemiBold', color: colors.primary }}>
                  {tab === 'login' ? 'Registrati' : 'Accedi'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          {/* Fixed CTA */}
          <View style={{
            paddingHorizontal: spacing[6],
            paddingTop: spacing[3],
            paddingBottom: Math.max(insets.bottom, spacing[4]),
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}>
            <Pressable
              onPress={handleSubmit}
              disabled={!canSubmit}
              style={{
                backgroundColor: colors.primary,
                borderRadius: radius.full,
                paddingVertical: 14,
                alignItems: 'center',
                opacity: canSubmit ? 1 : 0.55,
                ...shadow.button,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: 'Quicksand_600SemiBold', color: colors.primaryForeground }}>
                {tab === 'login' ? 'Accedi' : 'Registrati'}
              </Text>
            </Pressable>
          </View>
          </View>{/* /inner card */}
        </View>{/* /wrapper */}

      </View>
    </SafeAreaView>
  )
}
