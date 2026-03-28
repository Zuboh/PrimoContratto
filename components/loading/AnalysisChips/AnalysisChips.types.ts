export type ChipState = 'pending' | 'active' | 'done' | 'success'

export interface ChipProps {
  label: string
  state: ChipState
  index: number
}

export interface AnalysisChipsProps {
  currentStep: number
  allDone: boolean
}
