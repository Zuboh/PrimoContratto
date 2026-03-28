import { useToastContext } from '@/contexts/ToastContext'
import { analyzeContract } from '@/services/ai'
import { useAnalysisStore, useHistoryStore } from '@/stores'
import { clearPendingUpload, getPendingUpload } from '@/stores/pendingUpload'
import { AnalysisResult } from '@/types'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'

export function useAnalysis() {
  const { reset, setAnalysis } = useAnalysisStore()
  const { addEntry } = useHistoryStore()
  const toast = useToastContext()
  const uploadRef = useRef(getPendingUpload())
  const resultRef = useRef<AnalysisResult | null>(null)
  const [analysisReady, setAnalysisReady] = useState(false)

  // Controlla file al mount
  useEffect(() => {
    if (!uploadRef.current) {
      router.back()
      return
    }

    // Lancia OpenAI subito in background
    const pending = uploadRef.current
    analyzeContract(pending.base64, pending.type)
      .then((result) => {
        resultRef.current = result
        setAnalysisReady(true)
      })
      .catch((e) => {
        toast.error(e instanceof Error ? e.message : 'Errore analisi')
        reset()
        router.back()
      })
  }, [])

  // Naviga quando allDone — chiamato da loading.tsx
  const onAllDone = async () => {
    const pending = uploadRef.current
    const result = resultRef.current
    if (!pending || !result) return

    const id = Date.now().toString()
    setAnalysis(result, pending.fileName)
    addEntry({
      id,
      fileName: pending.fileName,
      pdfHash: pending.hash,
      createdAt: new Date().toISOString(),
      result,
    })
    clearPendingUpload()
    router.replace({ pathname: '/report/[id]', params: { id } })
  }

  return { analysisReady, onAllDone }
}
