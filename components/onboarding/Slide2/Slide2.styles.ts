import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, isSmallScreen: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    iconCircle: {
      marginTop: isSmallScreen ? 90 : 125,
      width: 86,
      height: 86,
      borderRadius: 43,
      backgroundColor: theme.colors.sage50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      marginTop: 42,
      fontSize: 27,
      fontFamily: 'Quicksand_600SemiBold',
      color: theme.colors.foreground,
      textAlign: 'center',
      lineHeight: 38,
      letterSpacing: -0.4,
      maxWidth: 320,
    },
    description: {
      marginTop: 22,
      fontSize: 15,
      fontFamily: 'Quicksand_400Regular',
      color: theme.colors.foreground,
      textAlign: 'center',
      lineHeight: 23,
      maxWidth: 285,
    },
    pandaWrapper: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  })
