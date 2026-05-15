import type { LucideIcon } from 'lucide-react-native'
import { FolderOpen, Home, User } from 'lucide-react-native'

export interface TabConfig {
  route: string
  label: string
  icon: LucideIcon
}

export const TABS: TabConfig[] = [
  { route: '/', label: 'Panoramica', icon: Home },
  { route: '/history', label: 'Storico', icon: FolderOpen },
  { route: '/settings', label: 'Profilo', icon: User },
]
