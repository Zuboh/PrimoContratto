import { Theme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing[6],
    },
    titleContainer: {
      gap: theme.spacing[2],
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.foreground,
      lineHeight: 25,
    },
    titleHighlight: {
      color: theme.colors.primary,
      ...theme.typography.h2,
    },
    subtitle: {
      ...theme.typography.bodyLg,
      color: theme.colors.muted,
    },
    ctaContainer: {
      gap: theme.spacing[3],
    },
  })
