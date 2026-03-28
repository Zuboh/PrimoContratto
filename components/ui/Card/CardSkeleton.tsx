import React from 'react'
import { View } from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { Skeleton } from '../Skeleton'
import { SkeletonRow } from '../Skeleton/Skeleton'

export function CardSkeleton() {
  const { spacing, radius, colors, shadow } = useTheme()

  return (
    <View
      style={{
        padding: spacing[4],
        borderRadius: radius.lg,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing[3],
        ...shadow.sm,
      }}
    >
      <SkeletonRow gap={spacing[3]}>
        <Skeleton width={40} height={40} borderRadius={radius.md} />
        <View style={{ flex: 1, gap: spacing[2] }}>
          <SkeletonRow>
            <Skeleton width="60%" height={14} borderRadius={radius.sm} />
            <Skeleton
              width={16}
              height={16}
              borderRadius={radius.sm}
              style={{ marginLeft: 'auto' }}
            />
          </SkeletonRow>
          <Skeleton width="35%" height={12} borderRadius={radius.sm} />
        </View>
      </SkeletonRow>
      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginHorizontal: -spacing[4],
        }}
      />

      <SkeletonRow gap={spacing[2]}>
        <Skeleton width={90} height={26} borderRadius={radius.full} />
        <Skeleton width={85} height={26} borderRadius={radius.full} />
        <Skeleton width={44} height={26} borderRadius={radius.full} />
      </SkeletonRow>
    </View>
  )
}
