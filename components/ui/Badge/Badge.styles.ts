import { StyleSheet } from 'react-native';
import { Theme } from '../../../contexts/ThemeContext';
import { BadgeVariant } from '../../../types';

export const getVariantConfig = (
  colors: Theme['colors'],
): Record<
  BadgeVariant,
  { backgroundColor: string; borderColor: string; color: string }
> => ({
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.primary,
  },
  success: {
    backgroundColor: colors.successLight,
    borderColor: colors.successBorder,
    color: colors.success,
  },
  warning: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warningBorder,
    color: colors.warning,
  },
  error: {
    backgroundColor: colors.destructiveLight,
    borderColor: colors.destructiveBorder,
    color: colors.destructive,
  },
})

export const createStyles = (theme: Theme, color: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: theme.spacing[1],
      paddingVertical: theme.spacing[1],
      paddingHorizontal: theme.spacing[3],
      borderRadius: theme.radius.full,
      borderWidth: 1,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color,
    },
  })
