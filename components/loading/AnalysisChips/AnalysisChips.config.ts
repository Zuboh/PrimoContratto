export interface StepConfig {
  active: string
  done: string
  duration: number
}

export const ANALYSIS_STEPS: StepConfig[] = [
  {
    active: 'Ricevendo il documento...',
    done: 'Documento ricevuto',
    duration: 2000,
  },
  {
    active: 'Leggendo le clausole...',
    done: 'Clausole analizzate',
    duration: 3500,
  },
  {
    active: 'Controllando il CCNL...',
    done: 'CCNL verificato',
    duration: 3000,
  },
  { active: 'Preparando il report...', done: 'Report pronto', duration: 2500 },
]

export const TOTAL_DURATION = ANALYSIS_STEPS.reduce(
  (acc, s) => acc + s.duration,
  0,
)
