import { StatusBarStyle, StyleProp, ViewStyle } from 'react-native'

import { TIconsKeys } from '@assets/svg'

import { TIconProps } from '@/shared/ui/Icon/types'
import { EColors, Typography } from '@/shared/ui/styled'
import { TMargin } from '@/shared/ui/utils'

export type TStandardProps = {
  title?: string
  subtitle?: string
  goBack?: boolean
  icon?: TIconsKeys
  iconProps?: Omit<TIconProps, 'name'>
  backIconProps?: Omit<TIconProps, 'name'>
  onPress?: () => void
  onGoBack?: () => void
  hasShadow?: boolean
  color?: EColors
  textColor?: keyof typeof EColors
  barStyle?: StatusBarStyle
  rightAction?: React.ReactElement
  leftAction?: React.ReactElement
  topInset?: boolean
  titleAlign?: `${ETitleAlign}`
  TitleComponent?: typeof Typography.H2
  style?: StyleProp<ViewStyle>
} & TMargin

export enum ETitleAlign {
  start = 'start',
  center = 'center',
}
