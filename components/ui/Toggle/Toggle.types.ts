export interface ToggleProps {
  value: boolean
  onToggle: (value: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
}
