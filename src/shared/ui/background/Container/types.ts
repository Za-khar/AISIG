import { ReactNode } from 'react'

import { ImageSourcePropType, StatusBarStyle } from 'react-native'

import { Box, TTheme } from '@/shared/theme'

export type TContainerProps = React.ComponentProps<typeof Box> & {
  children?: ReactNode
  statusBarColor?: keyof TTheme['colors']
  barStyle?: StatusBarStyle
  safeArea?:
    | boolean
    | {
        top?: boolean
        bottom?: boolean
        left?: boolean
        right?: boolean
      }
  withBottomBar?: boolean
  withStatusBar?: boolean
  source?: ImageSourcePropType
}
