import { useTheme } from '@/hooks/useTheme'
import { Text, View } from 'react-native'
import { CONFIG } from './WarningBanner.config'
import { createStyles } from './WarningBanner.styles'
import { WarningBannerProps } from './Warningbanner.types'

export function WarningBanner({ status, style }: WarningBannerProps) {
  const theme = useTheme()
  const styles = createStyles(theme)
  const config = CONFIG[status] ?? CONFIG['warning']
  const Icon = config.icon

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderLeftColor: config.borderColor,
        },
        style,
      ]}
    >
      <Icon size={20} color={config.iconColor} strokeWidth={2} />
      <Text style={styles.text}>{config.label}</Text>
    </View>
  )
}
