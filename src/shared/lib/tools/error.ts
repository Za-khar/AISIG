// error-handler.ts
import axios, { AxiosError, AxiosResponse } from 'axios'
import Toast from 'react-native-toast-message'

import { i18n } from '@/app/i18n'

import { Sentry } from '../sentry'

export type TQueryErrorData = {
  message?: string
  error?: string
  statusCode?: number
  [key: string]: unknown
}

export type TQueryErrorDefaultData = {
  message: string
  code?: string
  originalError?: unknown
}

export enum EErrorKeys {
  NETWORK_ERROR = 'AxiosError: Network Error',
  TIMEOUT_ERROR = 'AxiosError: timeout of',
  SERVER_ERROR = 'AxiosError: Request failed with status code 500',
  NOT_FOUND = 'AxiosError: Request failed with status code 404',
  UNAUTHORIZED = 'AxiosError: Request failed with status code 401',
  FORBIDDEN = 'AxiosError: Request failed with status code 403',
  BAD_REQUEST = 'AxiosError: Request failed with status code 400',
}

export const errorsToShow = [
  EErrorKeys.NETWORK_ERROR,
  EErrorKeys.SERVER_ERROR,
  EErrorKeys.TIMEOUT_ERROR,
  EErrorKeys.NOT_FOUND,
  EErrorKeys.UNAUTHORIZED,
  EErrorKeys.FORBIDDEN,
  EErrorKeys.BAD_REQUEST,
]

export const parseError = (error: unknown): TQueryErrorDefaultData => {
  if (axios.isAxiosError(error)) {
    const response = error.response as
      | AxiosResponse<TQueryErrorData>
      | undefined

    return {
      message:
        response?.data?.message ||
        response?.data?.error ||
        error.message ||
        i18n.t('error.DEFAULT_ERROR'),
      code: response?.data?.statusCode?.toString() || error.code,
      originalError: error,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      originalError: error,
    }
  }

  return {
    message: i18n.t('error.DEFAULT_ERROR'),
    originalError: error,
  }
}

export const handleError = (
  error: unknown,
  options: {
    showToast?: boolean
    logError?: boolean
    toastDuration?: number
  } = {},
) => {
  const { showToast = false, logError = false, toastDuration = 4000 } = options

  const processedError = parseError(error)
  const isAxiosError = axios.isAxiosError(error)

  if (isAxiosError && processedError.code !== '401' && logError) {
    logRequestError(error as AxiosError)
  }

  const errorKey = Object.entries(EErrorKeys).find(([, value]) =>
    processedError.message.includes(value),
  )?.[0] as keyof typeof EErrorKeys

  const shouldShowToast =
    showToast &&
    (errorsToShow.includes(processedError.message as EErrorKeys) ||
      errorsToShow.some(pattern => processedError.message.includes(pattern)))

  if (shouldShowToast && errorKey) {
    const toastMessage = i18n.exists(`error.${errorKey}`)
      ? i18n.t(`error.${errorKey}`)
      : processedError.message

    Toast.show({
      type: 'error',
      text1: toastMessage,
      visibilityTime: toastDuration,
    })
  }

  return {
    isNetworkError: processedError.message.includes(EErrorKeys.NETWORK_ERROR),
    isServerError: processedError.message.includes(EErrorKeys.SERVER_ERROR),
    isTimeoutError: processedError.message.includes(EErrorKeys.TIMEOUT_ERROR),
    isNotFound: processedError.message.includes(EErrorKeys.NOT_FOUND),
    isUnauthorized: processedError.message.includes(EErrorKeys.UNAUTHORIZED),
    isForbidden: processedError.message.includes(EErrorKeys.FORBIDDEN),
    isBadRequest: processedError.message.includes(EErrorKeys.BAD_REQUEST),
    error: processedError,
    originalError: error,
    errorKey,
  }
}

const logRequestError = (error: AxiosError) => {
  Sentry.withScope(scope => {
    scope.setTag('point', 'API_REQUEST')
    scope.setLevel('error')

    scope.setExtra('url', error.config?.url)
    scope.setExtra('method', error.config?.method)
    scope.setExtra('status', error.response?.status)
    scope.setExtra('response', error.response?.data)
    scope.setExtra('request_headers', error.config?.headers)
    scope.setExtra('response_headers', error.response?.headers)

    Sentry.captureException(error, {
      tags: {
        type: 'api_request',
        status_code: error.response?.status || 'unknown',
      },
    })
  })

  if (__DEV__) {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      error: error.response?.data,
    })
  }
}
