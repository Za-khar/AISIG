import { Platform } from 'react-native'

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const PlatformUtils = {
  isIOS,
  isAndroid,
  OS: Platform.OS,
  version: Platform.Version,
}
