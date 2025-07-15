// hooks/useReturns.ts
import { useEffect, useState } from "react"

export function useReturns() {
  const [returns, setReturns] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/returns")
      .then((res) => res.json())
      .then((data) => setReturns(data))
  }, [])

  return { returns, setReturns }
}