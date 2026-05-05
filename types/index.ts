export type ClauseStatus = 'green' | 'yellow' | 'red'
export type GlobalStatus = 'positive' | 'warning' | 'critical'
export type Plan = 'free' | 'pro'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error'
export type ToastType = 'success' | 'error' | 'info' | 'warning'
export type UploadStep =
  | 'idle'
  | 'receiving'
  | 'reading'
  | 'checking_ccnl'
  | 'preparing'
  | 'done'
  | 'error'
export type TabRoute = 'analyze' | 'history' | 'settings'

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

export interface PayslipItem {
  id: string
  label: string
  value: string
  note: string
  status: ClauseStatus
}

export interface PayslipAnomaly {
  id: string
  title: string
  description: string
}

export interface PayslipResult {
  documentType: 'payslip'
  period: string
  ccnl: string
  globalStatus: GlobalStatus
  summary: string
  grossSalary: string
  netSalary: string
  items: PayslipItem[]
  anomalies: PayslipAnomaly[]
}

export interface UnknownResult {
  documentType: 'unknown'
  summary: string
}

export type AnalysisResult = ContractResult | PayslipResult | UnknownResult

export interface AnalysisEntry {
  id: string
  fileName: string
  pdfHash: string
  createdAt: string
  result: AnalysisResult
}

export interface UploadState {
  step: UploadStep
  progress: number
  error: string | null
}

export interface UploadedFile {
  name: string
  uri: string
  base64: string
  hash: string
  mimeType: string
  size: number
}

export interface User {
  id: string
  email: string
  plan: Plan
  analysesThisMonth: number
  createdAt: string
}

export interface NavTab {
  route: TabRoute
  label: string
  index: number
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  cached: boolean
}

export interface ToastMessage {
  type: ToastType
  message: string
  duration?: number
}

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
