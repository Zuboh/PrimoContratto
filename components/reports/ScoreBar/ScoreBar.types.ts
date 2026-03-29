import { ContractResult, PayslipResult } from '@/types'

export interface ScoreBarProps {
  analysis: ContractResult | PayslipResult
  style?: object
}

export interface ScoreCounts {
  green: number
  yellow: number
  red: number
}

export interface ScoreLegendItem {
  color: string
  count: number
  label: string
}

export interface ScoreData {
  total: number
  greenPct: number
  yellowPct: number
  redPct: number
  legend: ScoreLegendItem[]
  score: ScoreCounts
}
