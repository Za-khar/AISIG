import { ReactNode } from 'react'

import { StatusBarStyle, StyleProp, ViewStyle } from 'react-native'

import { EColors } from '@/shared/ui/styled'
import { TMargin } from '@/shared/ui/utils'

export type TContainerProps = {
  children: ReactNode
  color?: EColors
  barStyle?: StatusBarStyle
  topInset?: boolean
  style?: StyleProp<ViewStyle>
  transparent?: boolean
} & TMargin
