import { StyleSheet } from 'react-native'
import { Theme } from '../../../contexts/ThemeContext'

export const createStyles = (theme: Theme, value: boolean) =>
  StyleSheet.create({
    track: {
      width: 44,
      height: 24,
      borderRadius: theme.radius.full,
      backgroundColor: value ? theme.colors.primary : theme.colors.gray300,
      justifyContent: 'center',
      padding: 2,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.background,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 2,
    },
  })
