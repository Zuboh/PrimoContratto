import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, bottomInset?: number) =>
  StyleSheet.create({
    wrapper: {
      position: 'relative',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.isDark ? theme.colors.dark.surface : '#FFFFFF',
      paddingBottom: (bottomInset || 0) + 8,
      paddingTop: 8,
      paddingHorizontal: 8,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: theme.isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 8,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      gap: 3,
      minHeight: 44,
    },
    label: {
      fontSize: 11,
      letterSpacing: 0.2,
    },
    activeIndicator: {
      position: 'absolute',
      top: -2,
      width: 20,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.colors.primary,
    },
    fabSlot: {
      width: 64,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 4,
    },
    fabButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  })
