import type { LucideIcon } from 'lucide-react-native'
import { FolderOpen, Search, Settings } from 'lucide-react-native'

export interface TabConfig {
  route: string
  label: string
  icon: LucideIcon
}

export const TABS: TabConfig[] = [
  { route: '/', label: 'Analizza', icon: Search },
  { route: '/history', label: 'Storico', icon: FolderOpen },
  { route: '/settings', label: 'Impostazioni', icon: Settings },
]
