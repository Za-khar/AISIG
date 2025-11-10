import { StyleProp, ViewStyle } from 'react-native'

import { LinearGradientProps } from 'react-native-linear-gradient'

export type TMaskElementProps = {
  style?: StyleProp<ViewStyle>
  colors?: string[]
  locations?: number[]
  start?: LinearGradientProps['start']
  end?: LinearGradientProps['start']
  hideBottomBar?: boolean
}
