import { ViewStyle } from 'react-native'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'default' | 'sm'

export interface ButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  style?: ViewStyle
}
