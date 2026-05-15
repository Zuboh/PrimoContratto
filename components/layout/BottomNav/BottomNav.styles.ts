import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, bottomInset?: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: bottomInset || 8,
      paddingTop: theme.spacing[2],
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[1],
      paddingVertical: theme.spacing[2],
    },
    label: {
      fontSize: 10,
      fontFamily: theme.fontFamily.semiBold,
    },
  })
