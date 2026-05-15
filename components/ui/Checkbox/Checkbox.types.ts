export interface CheckboxProps {
  value: boolean
  onToggle: (value: boolean) => void
  label?: string
  disabled?: boolean
}
