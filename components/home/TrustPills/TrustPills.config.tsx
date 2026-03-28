import type { LucideIcon } from 'lucide-react-native'
import { Clock, FileText, Shield } from 'lucide-react-native'

export interface PillConfig {
  icon: LucideIcon
  label: string
}

export const TRUST_PILLS: PillConfig[] = [
  { icon: Shield, label: 'Privato' },
  { icon: FileText, label: 'In italiano' },
  { icon: Clock, label: '30 secondi' },
]
