import { STATUS_COLORS } from '@/constants/colors'
import { ContractResult, PayslipResult } from '@/types'
import { ScoreCounts, ScoreData } from './ScoreBar.types'

function getContractScore(analysis: ContractResult): ScoreCounts {
  const counts: ScoreCounts = { green: 0, yellow: 0, red: 0 }
  analysis.clauses.forEach((c) => {
    if (c.status === 'green') counts.green++
    else if (c.status === 'yellow') counts.yellow++
    else if (c.status === 'red') counts.red++
  })
  return counts
}

function getPayslipScore(analysis: PayslipResult): ScoreCounts {
  const counts: ScoreCounts = { green: 0, yellow: 0, red: 0 }
  analysis.items.forEach((item) => {
    if (item.status === 'green') counts.green++
    else if (item.status === 'yellow') counts.yellow++
    else if (item.status === 'red') counts.red++
  })
  return counts
}

export function buildScoreData(
  analysis: ContractResult | PayslipResult,
): ScoreData | null {
  const score =
    analysis.documentType === 'contract'
      ? getContractScore(analysis as ContractResult)
      : getPayslipScore(analysis as PayslipResult)

  const total = score.green + score.yellow + score.red
  if (total === 0) return null

  const legend = [
    { color: STATUS_COLORS.green, count: score.green, label: 'Ok' },
    {
      color: STATUS_COLORS.yellow,
      count: score.yellow,
      label: 'Da verificare',
    },
    { color: STATUS_COLORS.red, count: score.red, label: 'Criticità' },
  ].filter((item) => item.count > 0)

  return {
    total,
    greenPct: score.green / total,
    yellowPct: score.yellow / total,
    redPct: score.red / total,
    score,
    legend,
  }
}
