import { ViewStyle } from 'react-native'
import { BadgeVariant } from '../../../types'

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
  icon?: React.ReactNode
  style?: ViewStyle
  loading?: boolean
}

export interface BadgeSkeletonProps {
  width?: number
}
