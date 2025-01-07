import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQueryString = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) params.set(name, value)
      else params.delete(name)

      return params.toString()
    },
    [searchParams],
  )

  return {
    create: (name: string, value: string) =>
      router.push(`${pathname}?${createQueryString(name, value)}`),
    delete: (name: string) =>
      router.push(`${pathname}?${createQueryString(name, '')}`),
    get: (name: string) => searchParams.get(name),
  }
}
