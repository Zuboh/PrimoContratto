import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native'
import { colors } from '@/constants/colors'

export const CONFIG = {
  positive: {
    label: 'Contratto nella norma — nessuna clausola critica.',
    backgroundColor: colors.successLight,
    borderColor: colors.success,
    icon: CheckCircle,
    iconColor: colors.success,
  },
  warning: {
    label: 'Alcune clausole meritano attenzione prima di firmare.',
    backgroundColor: colors.warningLight,
    borderColor: colors.warning,
    icon: AlertTriangle,
    iconColor: colors.warning,
  },
  critical: {
    label: 'Clausole critiche presenti — non firmare senza negoziare.',
    backgroundColor: colors.destructiveLight,
    borderColor: colors.destructive,
    icon: XCircle,
    iconColor: colors.destructive,
  },
}
