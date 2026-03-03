import { ViewStyle } from 'react-native'

export type CardVariant =
  | 'default'
  | 'surface'
  | 'warning'
  | 'success'
  | 'error'

export interface CardProps {
  children?: React.ReactNode
  variant?: 'default' | 'surface' | 'warning' | 'success' | 'error'
  style?: ViewStyle
  loading?: boolean
}
