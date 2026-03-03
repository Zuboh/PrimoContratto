export type ClauseStatus = 'green' | 'yellow' | 'red'

export type GlobalStatus = 'positive' | 'warning' | 'critical'

export type ContractType =
  | 'Tempo Determinato'
  | 'Tempo Indeterminato'
  | 'Stage'
  | 'Apprendistato'
  | 'Partita IVA'
  | 'Collaborazione'
  | 'Altro'

export interface Clause {
  status: ClauseStatus
  title: string
  summary: string
  detail: string
  action: string
}

export interface AnalysisResult {
  contractType: ContractType
  ccnl: string
  globalStatus: GlobalStatus
  summary: string
  clauses: Clause[]
  missingItems: string[]
  negotiationScript: string
  didYouKnow: string
}

export interface AnalysisEntry {
  id: string
  contractName: string
  pdfHash: string
  result: AnalysisResult
  createdAt: string
}

export type UploadStep =
  | 'idle'
  | 'receiving'
  | 'reading'
  | 'checking_ccnl'
  | 'preparing'
  | 'done'
  | 'error'

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

export type Plan = 'free' | 'pro'

export interface User {
  id: string
  email: string
  plan: Plan
  analysesThisMonth: number
  createdAt: string
}

export type TabRoute = 'analyze' | 'history' | 'settings'

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

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  type: ToastType
  message: string
  duration?: number
}
