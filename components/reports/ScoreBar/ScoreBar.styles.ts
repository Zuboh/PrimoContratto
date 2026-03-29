import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[4],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing[3],
    },
    title: {
      ...theme.typography.label,
      color: theme.colors.muted,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      fontSize: 11,
    },
    total: {
      ...theme.typography.caption,
      color: theme.colors.muted,
    },
    barContainer: {
      flexDirection: 'row',
      height: 10,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: theme.colors.border,
      gap: 2,
    },
    barSegment: {
      borderRadius: 8,
    },
    legend: {
      flexDirection: 'row',
      marginTop: theme.spacing[3],
      gap: theme.spacing[4],
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[1],
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      ...theme.typography.caption,
      color: theme.colors.muted,
      fontSize: 12,
    },
    legendCount: {
      ...theme.typography.caption,
      fontWeight: '600',
      fontSize: 12,
    },
  })
