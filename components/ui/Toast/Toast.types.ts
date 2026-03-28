export type ToastType = 'error' | 'success' | 'warning' | 'info'

export interface ToastData {
  id: string
  type: ToastType
  message: string
  duration?: number
}

export interface ToastProps extends ToastData {
  onHide: (id: string) => void
}

export interface ToastContainerProps {
  toasts: ToastData[]
  onHide: (id: string) => void
}
