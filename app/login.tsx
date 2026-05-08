import { makeRedirectUri } from 'expo-auth-session'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Eye, EyeOff } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useTheme } from '@/hooks/useTheme'
import { supabase } from '@/services/supabase'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    if (!email || !password) {
      setError('Inserisci email e password')
      return
    }
    setError(null)
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      router.replace('/(tabs)')
    }
  }

  async function handleGoogle() {
    setError(null)
    setGoogleLoading(true)
    const redirectUri = makeRedirectUri({ scheme: 'primocontratto', path: 'auth/callback' })
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUri, skipBrowserRedirect: true },
    })
    if (oauthError) {
      setError(oauthError.message)
      setGoogleLoading(false)
      return
    }
    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri)
      if (result.type === 'success' && result.url) {
        // supabase handles session via onAuthStateChange in _layout
      }
    }
    setGoogleLoading(false)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoRow}>
            <Logo size={48} />
          </View>

          <Text style={styles.title}>Bentornato</Text>
          <Text style={styles.subtitle}>Accedi per analizzare i tuoi documenti</Text>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="nome@email.com"
                placeholderTextColor={theme.colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.placeholder}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  textContentType="password"
                  autoComplete="password"
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={8}
                >
                  {showPassword ? (
                    <EyeOff size={18} color={theme.colors.muted} />
                  ) : (
                    <Eye size={18} color={theme.colors.muted} />
                  )}
                </Pressable>
              </View>
            </View>

            <Button
              label="Accedi"
              onPress={handleLogin}
              variant="primary"
              loading={loading}
              disabled={loading || googleLoading}
              fullWidth
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>oppure</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              label="Continua con Google"
              onPress={handleGoogle}
              variant="secondary"
              loading={googleLoading}
              disabled={loading || googleLoading}
              fullWidth
            />
          </View>

          <TouchableOpacity
            style={styles.switchRow}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.switchText}>Non hai un account? </Text>
            <Text style={[styles.switchText, styles.switchLink]}>Registrati</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function createStyles(theme: ReturnType<typeof useTheme>) {
  const { colors, typography, spacing } = theme
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: spacing[6],
      paddingBottom: spacing[8],
    },
    logoRow: {
      marginTop: 48,
      marginBottom: spacing[6],
    },
    title: {
      ...typography.h1,
      color: colors.foreground,
      textAlign: 'center',
    },
    subtitle: {
      ...typography.body,
      color: colors.muted,
      textAlign: 'center',
      marginTop: spacing[2],
      marginBottom: spacing[8],
    },
    form: {
      width: '100%',
      maxWidth: 360,
      gap: spacing[4],
    },
    fieldGroup: {
      gap: 4,
    },
    label: {
      ...typography.labelSm,
      color: colors.foreground,
    },
    input: {
      height: 48,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: spacing[4],
      fontSize: 14,
      color: colors.foreground,
      fontFamily: theme.fontFamily.regular,
    },
    passwordRow: {
      position: 'relative',
    },
    passwordInput: {
      paddingRight: 48,
    },
    eyeIcon: {
      position: 'absolute',
      right: 16,
      top: 0,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      ...typography.caption,
      color: colors.destructive,
      textAlign: 'center',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[3],
      marginVertical: spacing[2],
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      ...typography.caption,
      color: colors.muted,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: spacing[6],
    },
    switchText: {
      ...typography.body,
      color: colors.muted,
    },
    switchLink: {
      color: colors.primary,
      fontFamily: theme.fontFamily.semiBold,
    },
  })
}
