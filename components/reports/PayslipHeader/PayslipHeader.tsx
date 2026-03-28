import { useTheme } from '@/hooks/useTheme'
import { Text, View } from 'react-native'
import { createStyles } from './PayslipHeader.styles'
import { PayslipHeaderProps } from './PayslipHeader.types'

export function PayslipHeader({
  grossSalary,
  netSalary,
  ccnl,
  style,
}: PayslipHeaderProps) {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.ccnl}>{ccnl}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.caption}>Lordo</Text>
          <Text style={styles.grossAmount}>{grossSalary}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.column}>
          <Text style={styles.caption}>Netto</Text>
          <Text style={styles.netAmount}>{netSalary}</Text>
        </View>
      </View>
    </View>
  )
}
