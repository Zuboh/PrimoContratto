import { useTheme } from '@/hooks/useTheme'
import { Skeleton } from '../Skeleton'

export function BadgeSkeleton({ width = 80 }: { width?: number }) {
  const { radius } = useTheme()
  return <Skeleton width={width} height={28} borderRadius={radius.full} />
}
