import { useTheme } from '@/hooks/useTheme'
import React from 'react'
import { View } from 'react-native'
import { ANALYSIS_STEPS } from './AnalysisChips.config'
import { createStyles } from './AnalysisChips.styles'
import { AnalysisChipsProps, ChipState } from './AnalysisChips.types'
import { Chip } from './Chip/Chip'

export function AnalysisChips({ currentStep, allDone }: AnalysisChipsProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  const visibleCount = allDone ? ANALYSIS_STEPS.length : currentStep + 1

  return (
    <View style={styles.container}>
      {ANALYSIS_STEPS.slice(0, visibleCount).map((step, i) => {
        const isDone = i < currentStep || allDone
        const isCurrent = i === currentStep && !allDone
        const isLast = i === ANALYSIS_STEPS.length - 1

        let state: ChipState = 'done'
        if (isCurrent) state = 'active'
        else if (isDone && isLast && allDone) state = 'success'
        else if (isDone) state = 'done'

        const label = isDone ? step.done : step.active

        return <Chip key={i} index={i} label={label} state={state} />
      })}
    </View>
  )
}
