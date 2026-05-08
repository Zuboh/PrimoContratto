import { makeRedirectUri } from 'expo-auth-session'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Eye, EyeOff } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useTheme } from '@/hooks/useTheme'
import { supabase } from '@/services/supabase'

WebBrowser.maybeCompleteAuthSession()

export default function RegisterScreen() {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    if (!email || !password) {
      setError('Inserisci email e password')
      return
    }
    setError(null)
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
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
      await WebBrowser.openAuthSessionAsync(data.url, redirectUri)
    }
    setGoogleLoading(false)
  }

  if (success) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successContainer}>
          <Logo size={48} />
          <Text style={styles.title}>Controlla la tua email</Text>
          <Text style={styles.subtitle}>
            Ti abbiamo inviato un link di conferma. Controlla la tua email per confermare il tuo account.
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={[styles.switchText, styles.switchLink]}>Torna al login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
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

          <Text style={styles.title}>Crea account</Text>
          <Text style={styles.subtitle}>
            Inizia ad analizzare i tuoi documenti gratuitamente
          </Text>

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
                  textContentType="newPassword"
                  autoComplete="new-password"
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
              label="Crea account"
              onPress={handleRegister}
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
            onPress={() => router.push('/login')}
          >
            <Text style={styles.switchText}>Hai già un account? </Text>
            <Text style={[styles.switchText, styles.switchLink]}>Accedi</Text>
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
    successContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing[6],
      gap: spacing[4],
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
