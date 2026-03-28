import { useEffect, useState } from 'react'

export function useMinimumLoading(isLoading: boolean, minMs = 800): boolean {
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
      return
    }
    const timer = setTimeout(() => setLoading(false), minMs)
    return () => clearTimeout(timer)
  }, [isLoading, minMs])

  return loading
}
