import { ClauseStatus, GlobalStatus } from '../types'

/**
 * Restituisce il colore della clausola in base allo status
 */
export function getClauseColor(status: ClauseStatus): string {
  const map: Record<ClauseStatus, string> = {
    green: '#0B7B3E',
    yellow: '#C05B00',
    red: '#DC2626',
  }
  return map[status]
}

/**
 * Restituisce la label leggibile dello status globale
 */
export function getGlobalStatusLabel(status: GlobalStatus): string {
  const map: Record<GlobalStatus, string> = {
    positive: 'Contratto nella norma',
    warning: 'Alcune clausole da verificare',
    critical: 'Clausole critiche presenti',
  }
  return map[status]
}

/**
 * Conta le clausole per status
 */
export function countClausesByStatus(
  clauses: { status: ClauseStatus }[],
): Record<ClauseStatus, number> {
  return clauses.reduce(
    (acc, clause) => {
      acc[clause.status]++
      return acc
    },
    { green: 0, yellow: 0, red: 0 },
  )
}
