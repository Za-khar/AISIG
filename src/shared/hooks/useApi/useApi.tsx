// hooks/api/useApi.ts
import { AxiosError, AxiosResponse } from 'axios'
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr'

type ApiFunction<T, P = void> = (payload?: P) => Promise<T>

// Helper function to generate consistent keys from functions
const generateKey = <T, P>(
  fn: ApiFunction<T, P>,
  payload?: P,
): string | Array<unknown> => {
  const baseKey = fn.name || fn.toString()
  return payload ? [baseKey, payload] : baseKey
}
type TResponse<T> = AxiosResponse<T>

const unwrapResponse = async <T,>(
  response: Promise<T> | Promise<TResponse<T>>,
): Promise<T> => {
  const result = await response
  // Type guard for AxiosResponse
  if (typeof result === 'object' && result !== null && 'data' in result) {
    return (result as TResponse<T>).data
  }
  return result as T
}

// Overload signatures for useApiQuery
export function useApiQuery<T, P = void>(
  fetcher: ApiFunction<T, P>,
  options?: SWRConfiguration & { enabled?: boolean; payload?: P },
): {
  data: T | undefined
  error: AxiosError | undefined
  isLoading: boolean
  isValidating: boolean
  mutate: KeyedMutator<T>
}

export function useApiQuery<T, P = void>(
  key: string | Array<unknown>,
  fetcher: ApiFunction<T, P>,
  options?: SWRConfiguration & { enabled?: boolean; payload?: P },
): {
  data: T | undefined
  error: AxiosError | undefined
  isLoading: boolean
  isValidating: boolean
  mutate: KeyedMutator<T>
}

export function useApiQuery<T, P = void>(
  keyOrFetcher: string | Array<unknown> | ApiFunction<T, P>,
  fetcherOrOptions?:
    | ApiFunction<T, P>
    | (SWRConfiguration & { enabled?: boolean; payload?: P }),
  options?: SWRConfiguration & { enabled?: boolean; payload?: P },
) {
  // Implementation
  const actualFetcher =
    typeof keyOrFetcher === 'function'
      ? keyOrFetcher
      : (fetcherOrOptions as ApiFunction<T, P>)

  const actualKey =
    typeof keyOrFetcher === 'function'
      ? generateKey(keyOrFetcher, options?.payload)
      : keyOrFetcher

  const actualOptions =
    typeof keyOrFetcher === 'function'
      ? (fetcherOrOptions as SWRConfiguration & {
          enabled?: boolean
          payload?: P
        })
      : options

  const { enabled = true, payload, ...swrOptions } = actualOptions || {}

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    T,
    AxiosError
  >(
    enabled
      ? Array.isArray(actualKey)
        ? [...actualKey, payload]
        : payload
        ? [actualKey, payload]
        : actualKey
      : null,
    () => unwrapResponse(actualFetcher(payload)),
    {
      revalidateOnFocus: false,
      ...swrOptions,
    },
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
