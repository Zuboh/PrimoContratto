export type GlobalStatus = 'positive' | 'warning' | 'critical'
export type ClauseStatus = 'green' | 'yellow' | 'red'
export type DocumentType = 'contract' | 'payslip' | 'unknown'

// ── Contratto ─────────────────────────────

export interface Clause {
  id: string
  title: string
  summary: string
  detail: string
  status: ClauseStatus
}

export interface MissingClause {
  id: string
  title: string
  description: string
}

export interface ContractResult {
  documentType: 'contract'
  contractType: string
  ccnl: string
  globalStatus: GlobalStatus
  summary: string
  clauses: Clause[]
  missingClauses: MissingClause[]
}

// ── Busta paga ────────────────────────────

export interface PayslipItem {
  id: string
  label: string
  value: string
  note: string
  status: ClauseStatus
}

export interface PayslipResult {
  documentType: 'payslip'
  period: string // es. "Febbraio 2026"
  ccnl: string
  globalStatus: GlobalStatus
  summary: string
  grossSalary: string // es. "€2.100,00"
  netSalary: string // es. "€1.580,00"
  items: PayslipItem[] // trattenute, voci, straordinari
  anomalies: {
    id: string
    title: string
    description: string
  }[]
}

// ── Documento non riconosciuto ─────────────

export interface UnknownResult {
  documentType: 'unknown'
  summary: string
}

// ── Tipo unione ───────────────────────────

export type AnalysisResult = ContractResult | PayslipResult | UnknownResult

// ── Negoziazione (solo contratti) ─────────

export interface NegotiationPoint {
  id: string
  clauseTitle: string
  opening: string
  objectionResponse: string
  fallback: string
}

export interface NegotiationResult {
  intro: string
  points: NegotiationPoint[]
  closing: string
}
