import type { LucideIcon } from 'lucide-react-native'
import { History, Home, Settings } from 'lucide-react-native'

export interface TabConfig {
  label: string
  icon: LucideIcon
  pageIndex: number
}

export const TABS: TabConfig[] = [
  { label: 'Home', icon: Home, pageIndex: 0 },
  { label: 'Storico', icon: History, pageIndex: 1 },
  { label: 'Impostazioni', icon: Settings, pageIndex: 2 },
]
