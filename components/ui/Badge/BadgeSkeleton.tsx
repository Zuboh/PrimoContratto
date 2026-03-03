import { useTheme } from '@/contexts/ThemeContext'
import { Skeleton } from '../Skeleton'

export function BadgeSkeleton({ width = 80 }: { width?: number }) {
  const { radius } = useTheme()
  return <Skeleton width={width} height={28} borderRadius={radius.full} />
}
