import { useToastContext } from '@/contexts/ToastContext'
import { useAnalysisStore } from '@/stores/analysisStore'
import { useAuthStore } from '@/stores/authStore'
import { setPendingUpload } from '@/stores/pendingUpload'
import { generatePdfHash, isFileTooLarge, uriToBase64 } from '@/utils/pdf'
import * as DocumentPicker from 'expo-document-picker'
import * as Haptics from 'expo-haptics'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useBoolean } from './useBoolean'

export function useUpload() {
  const loadingPdf = useBoolean(false)
  const loadingCamera = useBoolean(false)
  const { setStep } = useAnalysisStore()
  const toast = useToastContext()

  const handlePickPdf = async () => {
    try {
      loadingPdf.setTrue()

      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      })

      if (result.canceled) {
        return
      }

      const file = result.assets[0]

      if (file.size && isFileTooLarge(file.size.toString())) {
        toast.error('Il file è troppo grande. Massimo 10MB.')
        return
      }

      const base64 = await uriToBase64(file.uri)
      console.log('1. base64 ok, lunghezza:', base64.length)
      const hash = await generatePdfHash(base64)
      console.log('2. hash ok:', hash)

      setPendingUpload({ base64, hash, fileName: file.name, type: 'pdf' })
      console.log('3. pendingUpload settato')

      if (!useAuthStore.getState().canAnalyze()) {
        toast.error('Hai raggiunto il limite di 3 analisi gratuite questo mese.')
        return
      }

      setStep('receiving')
      console.log('4. step settato')

      router.push('/loading')
      console.log('5. router.push chiamato')
    } catch (e) {
      console.log('ERRORE:', e)
      toast.error('Errore durante il caricamento del file.')
    } finally {
      loadingPdf.setFalse()
    }
  }

  const handleCamera = async () => {
    try {
      loadingCamera.setTrue()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      const permission = await ImagePicker.requestCameraPermissionsAsync()
      if (!permission.granted) {
        toast.error('Permesso fotocamera negato.')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        base64: true,
      })

      if (result.canceled) return

      const image = result.assets[0]
      if (!image.base64) return

      const hash = await generatePdfHash(image.base64)

      setPendingUpload({
        base64: image.base64,
        hash,
        fileName: 'foto_contratto.jpg',
        type: 'image',
      })

      if (!useAuthStore.getState().canAnalyze()) {
        toast.error('Hai raggiunto il limite di 3 analisi gratuite questo mese.')
        return
      }

      setStep('receiving')
    } catch {
      toast.error('Errore durante lo scatto della foto.')
    } finally {
      loadingCamera.setFalse()
    }
  }

  return {
    handlePickPdf,
    handleCamera,
    loadingPdf: loadingPdf.value,
    loadingCamera: loadingCamera.value,
  }
}
