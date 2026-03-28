import { useEffect, useRef } from 'react'

export function useMountEffect(fn: () => void) {
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current()
  }, [])
}
