// hooks/api/useInfiniteApiQuery.ts
import { AxiosError } from 'axios'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

type PaginatedResponse<T> = {
  docs: T[]
  totalCount: number
}

type ApiFunction<T, P = {}> = (payload: P) => Promise<PaginatedResponse<T>>

export const useInfiniteApiQuery = <T, P = {}>(
  fetcher: ApiFunction<T, P & { skip: number; limit: number }>,
  options?: SWRInfiniteConfiguration & {
    initialSize?: number
    limit?: number
    payload?: P
    onLoadMore?: (nextSkip: number) => void
  },
) => {
  const {
    initialSize = 1,
    limit = 10,
    payload,
    onLoadMore,
    ...swrOptions
  } = options || {}

  const getKey = (
    pageIndex: number,
    previousPageData: PaginatedResponse<T> | null,
  ) => {
    if (previousPageData && previousPageData.docs.length < limit) return null
    const skip = pageIndex * limit
    return JSON.stringify({ ...payload, skip, limit })
  }

  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite<PaginatedResponse<T>, AxiosError>(
      getKey,
      key => fetcher(JSON.parse(key)),
      {
        ...swrOptions,
        initialSize,
        revalidateFirstPage: false,
      },
    )

  const docs = data?.flatMap(page => page.docs) ?? []
  const totalCount = data?.[0]?.totalCount ?? 0
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = docs.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.docs.length < limit)

  const loadMore = () => {
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1)
      onLoadMore?.(size * limit)
    }
  }

  return {
    docs,
    totalCount,
    error,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    loadMore,
    mutate,
    currentPage: size,
    currentSkip: (size - 1) * limit,
    isValidating,
    isLoading,
  }
}
