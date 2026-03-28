import { ViewStyle } from 'react-native'

export interface ToggleProps {
  value: boolean
  onToggle: () => void
  disabled?: boolean
  style?: ViewStyle
}
