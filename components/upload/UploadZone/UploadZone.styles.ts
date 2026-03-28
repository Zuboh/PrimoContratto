import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    zone: {
      width: '100%',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: 'dashed',
      borderRadius: theme.radius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing[12],
      paddingHorizontal: theme.spacing[6],
      gap: theme.spacing[3],
    },
    zonePressed: {
      backgroundColor: theme.colors.primaryLight,
    },
    iconWrapper: {
      width: 56,
      height: 56,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      ...theme.typography.label,
      color: theme.colors.foreground,
      marginTop: theme.spacing[2],
    },
    subtitle: {
      ...theme.typography.bodySm,
      color: theme.colors.primary,
    },
    hint: {
      ...theme.typography.caption,
      color: theme.colors.muted,
      textAlign: 'center',
      marginTop: theme.spacing[2],
    },
    actionsRow: {
      flexDirection: 'row',
      gap: theme.spacing[3],
      marginTop: theme.spacing[4],
    },
    actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.full,
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[4],
    },
    actionBtnText: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.primary,
    },
  })
