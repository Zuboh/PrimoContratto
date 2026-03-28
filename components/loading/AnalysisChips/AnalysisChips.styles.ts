import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing[2],
      marginTop: theme.spacing[8],
      alignItems: 'flex-start',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[2],
      paddingLeft: theme.spacing[2],
      paddingRight: theme.spacing[4],
      borderRadius: theme.radius.full,
      borderWidth: 1,
    },
    chipActive: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
    },
    chipDone: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    chipSuccess: {
      backgroundColor: '#ECFDF5',
      borderColor: '#A7F3D0',
    },
    chipTextActive: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.primary,
    },
    chipTextDone: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.foreground,
    },
    chipTextSuccess: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.success,
    },
    checkBadge: {
      width: 18,
      height: 18,
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    checkBadgePrimary: {
      backgroundColor: theme.colors.primary,
    },
    checkBadgeSuccess: {
      backgroundColor: theme.colors.success,
    },
  })
