import { ClauseStatus } from '@/types'

export interface ClauseCardData {
  id: string
  title: string
  summary: string
  detail: string
  status: ClauseStatus
}
