import { ToastData, ToastType } from '@/components/ui/Toast/Toast.types'
import { useCallback, useState } from 'react'

let _id = 0
const nextId = () => String(++_id)

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const show = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = nextId()
      setToasts((prev) => [...prev, { id, type, message, duration }])
    },
    [],
  )

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = {
    error: (msg: string) => show('error', msg),
    success: (msg: string) => show('success', msg),
    warning: (msg: string) => show('warning', msg),
    info: (msg: string) => show('info', msg),
  }

  return { toasts, toast, hide }
}
