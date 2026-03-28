import { ViewStyle } from 'react-native'

export type BannerStatus = 'positive' | 'warning' | 'critical'

export interface WarningBannerProps {
  status: BannerStatus
  style?: ViewStyle
}
