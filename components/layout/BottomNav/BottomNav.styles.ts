import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, bottomInset?: number) =>
  StyleSheet.create({
    // DS: BottomNav is a floating card — r-xl, shadow-card, surface bg
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,     // r-xl (28px) — card shape
      marginHorizontal: 16,
      marginBottom: (bottomInset ?? 0) + 12,
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
      ...theme.shadow.sm,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[1],
      paddingVertical: theme.spacing[2],
    },
    // DS: active label weight 700, inactive muted
    label: {
      fontSize: 10,
      fontFamily: theme.fontFamily.bold,
    },
  })
