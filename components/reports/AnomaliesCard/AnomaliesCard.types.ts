import { ViewStyle } from 'react-native'

interface Anomaly {
  id: string
  title: string
  description: string
}

export interface AnomaliesCardProps {
  anomalies: Anomaly[]
  style?: ViewStyle
}
