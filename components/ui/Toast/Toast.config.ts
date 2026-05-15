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
      backgroundColor: '#F1F8E9',
      borderColor: '#A5D6A7',
      iconColor: colors.success,
    },
    error: {
      icon: XCircle,
      backgroundColor: '#FFEBEE',
      borderColor: '#EF9A9A',
      iconColor: colors.destructive,
    },
    warning: {
      icon: AlertTriangle,
      backgroundColor: '#FFF3E0',
      borderColor: '#FFCC80',
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
