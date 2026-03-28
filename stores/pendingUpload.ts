export type PendingUpload = {
  base64: string
  hash: string
  fileName: string
  type: 'image' | 'pdf'
}

let _pending: PendingUpload | null = null

export const setPendingUpload = (data: PendingUpload) => {
  _pending = data
}
export const getPendingUpload = () => _pending
export const clearPendingUpload = () => {
  _pending = null
}
