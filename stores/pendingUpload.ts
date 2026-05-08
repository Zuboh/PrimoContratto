export type DocumentType = 'contratto' | 'busta_paga'

export type PendingUpload = {
  base64: string
  hash: string
  fileName: string
  type: 'image' | 'pdf'
  documentType: DocumentType
}

let _pending: PendingUpload | null = null

export const setPendingUpload = (data: PendingUpload) => {
  _pending = data
}
export const getPendingUpload = () => _pending
export const clearPendingUpload = () => {
  _pending = null
}
