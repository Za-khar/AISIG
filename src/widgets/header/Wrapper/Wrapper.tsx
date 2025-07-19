import React, { ReactElement } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from 'styled-components'

import * as S from './styles'
import { TContainerProps } from './types'

export const Wrapper = ({
  children,
  color,
  topInset = false,
  transparent = true,
  ...props
}: TContainerProps): ReactElement => {
  const { COLORS } = useTheme()
  const { top } = useSafeAreaInsets()

  const bg = transparent ? COLORS.transparent : color || COLORS.neutral_100

  const getStyle = (): StyleProp<ViewStyle> => {
    return {
      backgroundColor: bg,
    }
  }

  return (
    <S.Header style={[getStyle()]} {...props}>
      {!!topInset && <S.BarHeight height={top} />}
      {/* {isAndroid && !topInset && <S.BarHeight height={12} />} */}
      {children}
    </S.Header>
  )
}
