export interface RadioProps {
  value: boolean
  onSelect: () => void
  label?: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: { value: string; label: string; description?: string }[]
  selected: string
  onSelect: (value: string) => void
  disabled?: boolean
}
