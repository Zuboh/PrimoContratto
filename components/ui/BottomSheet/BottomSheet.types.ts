export type BottomSheetVariant = 'default' | 'confirmation' | 'destructive' | 'info' | 'success'

export interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  title?: string
  description?: string
  variant?: BottomSheetVariant
  primaryLabel?: string
  onPrimary?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  children?: React.ReactNode
}
