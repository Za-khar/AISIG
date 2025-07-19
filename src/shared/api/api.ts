import { Platform } from 'react-native'

import axios from 'axios'

import DeviceInfo from 'react-native-device-info'

import { useUserStore } from '@/entities/user'

import { handleError } from '../lib'
import { FirebaseService } from '../services'

const logoutBlackList: Array<String> = []

const version = `${DeviceInfo.getVersion()}${
  Platform.OS === 'ios'
    ? ` (${DeviceInfo.getBuildNumber()})`
    : `.${DeviceInfo.getBuildNumber()}`
}`

const headerDeviceData = {
  'App-Version': version,
  'System-Version': `${Platform.OS} ${DeviceInfo.getSystemVersion()}`,
  Device: `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
}
const privateInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    ...headerDeviceData,
  },
})

const publicInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    ...headerDeviceData,
  },
})

privateInstance.interceptors.request.use(
  async config => {
    const token = await FirebaseService.getIdToken(true)

    const uniqueId = await DeviceInfo.getUniqueId()

    config.headers = config.headers || {}

    config.headers.deviceid = uniqueId
    config.headers.UUID = uniqueId

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

privateInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !logoutBlackList.some(item => originalRequest.url.includes(item))
    ) {
      originalRequest._retry = true

      try {
        // Force refresh token
        const newToken = await FirebaseService.getIdToken(true)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return privateInstance(originalRequest)
      } catch (refreshError) {
        useUserStore.getState().clear()
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    handleError(error)

    return Promise.reject(error)
  },
)

publicInstance.interceptors.request.use(
  async config => {
    const uniqueId = await DeviceInfo.getUniqueId()

    config.headers = config.headers || {}

    config.headers.deviceid = uniqueId
    config.headers.UUID = uniqueId

    return config
  },
  error => {
    handleError(error, {
      logError: true,
      showToast: true,
    })
    return Promise.reject(error)
  },
)

publicInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    handleError(error, {
      logError: true,
      showToast: true,
    })

    return Promise.reject(error)
  },
)

export const apiPrivate = privateInstance
export const apiPublic = publicInstance
