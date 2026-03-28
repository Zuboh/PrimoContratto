import { ViewStyle } from 'react-native'

interface MissingClause {
  id: string
  title: string
  description: string
}

export interface MissingClausesCardProps {
  clauses: MissingClause[]
  style?: ViewStyle
}
