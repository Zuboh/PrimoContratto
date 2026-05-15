import { ViewStyle } from 'react-native'

export type CardVariant =
  | 'default'
  | 'hero'
  | 'surface'
  | 'warning'
  | 'success'
  | 'error'

export interface CardProps {
  children?: React.ReactNode
  variant?: CardVariant
  style?: ViewStyle
  loading?: boolean
}
