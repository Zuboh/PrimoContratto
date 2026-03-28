import { ANALYSIS_STEPS } from '@/components/loading/AnalysisChips/AnalysisChips.config'
import { useEffect, useRef, useState } from 'react'

interface UseAnalysisProgressReturn {
  currentStep: number
  allDone: boolean
}

export function useAnalysisProgress(active: boolean, analysisReady: boolean) {
  const [currentStep, setCurrentStep] = useState(0)
  const [allDone, setAllDone] = useState(false)
  const elapsed = useRef(0)

  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      elapsed.current += 80
      let cumulative = 0

      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        cumulative += ANALYSIS_STEPS[i].duration

        // Ultimo step — aspetta analysisReady
        if (i === ANALYSIS_STEPS.length - 1) {
          if (elapsed.current >= cumulative) {
            if (analysisReady) {
              // OpenAI ha risposto → completa
              clearInterval(interval)
              setAllDone(true)
            } else {
              // OpenAI ancora in corso → rimani all'ultimo step
              setCurrentStep(i)
            }
          }
          return
        }

        if (elapsed.current < cumulative) {
          setCurrentStep(i)
          return
        }
      }
    }, 80)

    return () => clearInterval(interval)
  }, [active, analysisReady])

  return { currentStep, allDone }
}
