"use client"

import { useCallback, useState } from "react"

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(async (apiCall: () => Promise<T>) => {
    try {
      setLoading(true)
      setError(null)

      const result = await apiCall()
      setData(result)

      return result
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    loading,
    error,
    request,
  }
}
