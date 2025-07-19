// src/theme/restyleTheme.ts

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { BoxProps, createBox, createText, createTheme } from '@shopify/restyle'

import { palette } from './palette'
import { spacing } from './spacing'
import { textVariants } from './typography'

export const theme = createTheme({
  colors: {
    ...palette,
    primary: palette.blue500,
    secondary: palette.green500,
    background: palette.white,
    text: palette.black,
    error: palette.red500,
  },
  spacing,
  textVariants,
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
})

export type TTheme = typeof theme
export type TThemeColors = keyof TTheme['colors']

export type TThemeProps = BoxProps<TTheme>

export const Box = createBox<TTheme>()
export const TouchableBox = createBox<TTheme, TouchableOpacityProps>(
  TouchableOpacity,
)
export const Text = createText<TTheme>()

export const createThemeComponent = <T>(Comp: React.ComponentType<T>) => {
  return createBox<TTheme, T>(Comp)
}
