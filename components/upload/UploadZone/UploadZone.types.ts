import { ViewStyle } from 'react-native'

export interface UploadZoneProps {
  onPickPdf: () => void
  onCamera: () => void
  loading?: boolean
  style?: ViewStyle
}
