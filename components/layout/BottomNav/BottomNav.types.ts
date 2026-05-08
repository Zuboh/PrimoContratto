import type { LucideIcon } from 'lucide-react-native'

export interface BottomNavProps {
  activePage: number
  onPageChange: (page: number) => void
}

export interface TabButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  onPress: () => void
}

export interface FabButtonProps {
  onPress: () => void
}
