import { STATUS_COLORS } from '@/constants/colors'
import { useBoolean } from '@/hooks/useBoolean'
import { useTheme } from '@/hooks/useTheme'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import { Pressable, Text, View } from 'react-native'
import { createStyles } from './ClauseCard.styles'
import { ClauseCardData } from './ClauseCard.types'

export function ClauseCard({ title, summary, detail, status }: ClauseCardData) {
  const theme = useTheme()
  const styles = createStyles(theme)
  const expanded = useBoolean(false)

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.header, pressed && { opacity: 0.75 }]}
        onPress={expanded.toggle}
      >
        <View
          style={[styles.dot, { backgroundColor: STATUS_COLORS[status] }]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>
        {expanded.value ? (
          <ChevronUp size={18} color={theme.colors.muted} />
        ) : (
          <ChevronDown size={18} color={theme.colors.muted} />
        )}
      </Pressable>
      {expanded.value && (
        <View style={styles.detail}>
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      )}
    </View>
  )
}
