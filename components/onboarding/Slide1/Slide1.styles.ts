import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, isSmallScreen: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    header: {
      marginTop: isSmallScreen ? 70 : 110,
      alignItems: 'center',
      width: '100%',
    },
    tagline: {
      fontSize: isSmallScreen ? 16 : 17,
      fontFamily: 'Quicksand_400Regular',
      color: theme.colors.primary,
      textAlign: 'center',
      marginTop: 8,
    },
    pandaWrapper: {
      marginTop: isSmallScreen ? 70 : 100,
      width: '100%',
      alignItems: 'center',
    },
    caption: {
      fontSize: isSmallScreen ? 14 : 15,
      fontFamily: 'Quicksand_400Regular',
      color: theme.colors.muted,
      textAlign: 'center',
      lineHeight: isSmallScreen ? 21 : 23,
      maxWidth: 280,
      marginTop: isSmallScreen ? 18 : 28,
    },
  })
