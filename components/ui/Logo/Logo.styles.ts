import { StyleSheet } from 'react-native'
import { Theme } from '../../../contexts/ThemeContext'

export const createStyles = (theme: Theme, size: number) =>
  StyleSheet.create({
    iconWrapper: {
      width: size,
      height: size,
      borderRadius: size * 0.27,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
    },
    brandName: {
      ...theme.typography.brand,
      color: theme.colors.primary,
    },
  })
