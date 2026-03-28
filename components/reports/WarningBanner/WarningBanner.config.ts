import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native'

export const CONFIG = {
  positive: {
    label: 'Contratto nella norma — nessuna clausola critica.',
    backgroundColor: '#ECFDF5',
    borderColor: '#0B7B3E',
    icon: CheckCircle,
    iconColor: '#0B7B3E',
  },
  warning: {
    label: 'Alcune clausole meritano attenzione prima di firmare.',
    backgroundColor: '#FEF3E2',
    borderColor: '#C05B00',
    icon: AlertTriangle,
    iconColor: '#C05B00',
  },
  critical: {
    label: 'Clausole critiche presenti — non firmare senza negoziare.',
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
    icon: XCircle,
    iconColor: '#DC2626',
  },
}
