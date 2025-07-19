import { useEffect } from 'react'

import { BareFetcher, Middleware, SWRConfiguration } from 'swr'

import { storage } from '@/app/store'

export const swrPersistMiddleware: Middleware =
  useSWRNext => (key, fetcher, conf) => {
    const config = conf as SWRConfiguration<
      unknown,
      Error,
      BareFetcher<unknown>
    > & { persist: boolean; ttl: number }

    const persistKey = `swr-persist:${
      typeof key === 'string' ? key : JSON.stringify(key)
    }`

    const swr = useSWRNext(
      key,
      async () => {
        if (config?.persist) {
          try {
            const cached = storage.getString(persistKey)
            if (cached) {
              const { data, timestamp } = JSON.parse(cached)
              const isExpired =
                config.ttl && Date.now() - timestamp > config.ttl * 1000
              if (!isExpired) return data
            }
          } catch (error) {
            console.warn('Failed to load persisted SWR data:', error)
          }
        }

        // Add null check before invoking fetcher
        if (!fetcher) {
          throw new Error(
            'SWR fetcher is required when persistence is not available',
          )
        }
        return fetcher()
      },
      config,
    )

    useEffect(() => {
      if (!config?.persist) return

      return () => {
        if (swr.data) {
          storage.set(
            persistKey,
            JSON.stringify({
              data: swr.data,
              timestamp: Date.now(),
            }),
          )
        }
      }
    }, [swr.data, persistKey, config?.persist])

    return swr
  }
