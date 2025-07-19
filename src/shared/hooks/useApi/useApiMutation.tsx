// hooks/api/useApi.ts
import { AxiosError, AxiosResponse } from 'axios'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'

type TResponse<T> = AxiosResponse<T>

type ApiFunction<T, P> = (payload: P) => Promise<TResponse<T>>

const generateKey = <T, P>(fn: ApiFunction<T, P>): string => {
  return fn.name || fn.toString()
}

export function useApiMutation<T, P>(
  mutator: ApiFunction<T, P>,
  options?: Omit<SWRMutationConfiguration<T, AxiosError, string, P>, 'fetcher'>,
): {
  trigger: (arg: P) => Promise<T>
  data: T | undefined
  error: AxiosError | undefined
  isMutating: boolean
}

export function useApiMutation<T, P>(
  key: string,
  mutator: ApiFunction<T, P>,
  options?: SWRMutationConfiguration<T, AxiosError, string, P>,
): {
  trigger: (arg: P) => Promise<T>
  data: T | undefined
  error: AxiosError | undefined
  isMutating: boolean
}

export function useApiMutation<T, P>(
  keyOrMutator: string | ApiFunction<T, P>,
  mutatorOrOptions?:
    | ApiFunction<T, P>
    | SWRMutationConfiguration<T, AxiosError, string, P>,
  options?: SWRMutationConfiguration<T, AxiosError, string, P>,
) {
  const [actualKey, actualMutator, actualOptions] =
    typeof keyOrMutator === 'string'
      ? [keyOrMutator, mutatorOrOptions as ApiFunction<T, P>, options]
      : [
          generateKey(keyOrMutator),
          keyOrMutator,
          mutatorOrOptions as SWRMutationConfiguration<
            T,
            AxiosError,
            string,
            P
          >,
        ]

  const { trigger, data, error, isMutating } = useSWRMutation<
    T,
    AxiosError,
    string,
    P
  >(
    actualKey,
    async (_: string, { arg }: { arg: P }) => {
      console.log('arg: ', arg)
      // Correct fetcher signature
      try {
        const response = await actualMutator(arg)
        return response.data
      } catch (err) {
        throw err instanceof AxiosError ? err : new Error(String(err))
      }
    },
    {
      ...actualOptions,
    },
  )

  return {
    trigger,
    data,
    error: error as AxiosError | undefined,
    isMutating,
  }
}
