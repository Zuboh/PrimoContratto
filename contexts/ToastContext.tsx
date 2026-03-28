import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import React, { createContext, useContext } from 'react'

type ToastContextType = ReturnType<typeof useToast>['toast']

const ToastContext = createContext<ToastContextType>({} as ToastContextType)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, toast, hide } = useToast()

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onHide={hide} />
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext)
