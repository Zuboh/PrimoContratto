import { KeyboardTypeOptions, ViewStyle } from 'react-native'

export type TextFieldState = 'default' | 'error' | 'success' | 'disabled'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  helperText?: string
  errorText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoComplete?: string
  state?: TextFieldState
  style?: ViewStyle
  multiline?: boolean
}
