import { ViewStyle } from 'react-native'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  style?: ViewStyle
}
