import { AxiosResponse } from 'axios'

import { ELanguages } from '@/app/i18n'

export type TResponse<Response = unknown, Config = unknown> = Promise<
  AxiosResponse<Response, Config>
>

export type TQuery<TPayload, TRes> = {
  payload: TPayload
  response: TRes
}

export type TQueryErrorData = {
  error: string
  message: string
  statusCode: number
}

export type TQueryErrorDefaultData = {
  code?: string
  message?: string
}

export type TQueryListData<T> = {
  docs: Array<T>
  totalCount: number
}

export type TQueryListParams = Partial<{
  page: number
  skip: number
  limit: number
  order: 1 | -1
  sortBy: string
}>

export type TTranslateText = Record<ELanguages, string>
