import { create } from 'zustand'
import { AnalysisResult, UploadStep } from '../types'

interface AnalysisStore {
  step: UploadStep
  progress: number
  error: string | null

  currentAnalysis: AnalysisResult | null
  currentFileName: string | null

  setStep: (step: UploadStep) => void
  setProgress: (progress: number) => void
  setError: (error: string | null) => void
  setAnalysis: (result: AnalysisResult, fileName: string) => void
  reset: () => void
}

const initialState = {
  step: 'idle' as UploadStep,
  progress: 0,
  error: null,
  currentAnalysis: null,
  currentFileName: null,
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error, step: 'error' }),
  setAnalysis: (result, fileName) =>
    set({
      currentAnalysis: result,
      currentFileName: fileName,
      step: 'done',
      progress: 100,
      error: null,
    }),
  reset: () => set(initialState),
}))
