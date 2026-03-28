import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react-native'
import { ToastType } from './Toast.types'

export const DEFAULT_DURATION = 3000

export interface ToastConfig {
  icon: typeof CheckCircle
  backgroundColor: string
  borderColor: string
  iconColor: string
}

export const getToastConfig = (type: ToastType, colors: any): ToastConfig => {
  const map: Record<ToastType, ToastConfig> = {
    success: {
      icon: CheckCircle,
      backgroundColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      iconColor: colors.success,
    },
    error: {
      icon: XCircle,
      backgroundColor: '#FEF2F2',
      borderColor: '#FECACA',
      iconColor: colors.destructive,
    },
    warning: {
      icon: AlertTriangle,
      backgroundColor: '#FEF3E2',
      borderColor: '#FCD38A',
      iconColor: colors.warning,
    },
    info: {
      icon: Info,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      iconColor: colors.primary,
    },
  }
  return map[type]
}
