import type { LucideIcon } from 'lucide-react-native'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BottomNavProps {}

export interface TabButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  onPress: () => void
}
