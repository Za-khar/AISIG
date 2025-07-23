// src/theme/restyleTheme.ts

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { BoxProps, createBox, createText, createTheme } from '@shopify/restyle'

import { palette } from './palette'
import { spacing } from './spacing'
import { textVariants } from './typography'

export const lightTheme = createTheme({
  mode: 'light',
  colors: {
    // Base colors
    primary: palette.primary500,
    primaryLight: palette.primary400,
    primaryDark: palette.primary600,
    primaryPressed: palette.primary700,

    secondary: palette.secondary500,
    secondaryLight: palette.secondary400,
    secondaryDark: palette.secondary600,

    // Backgrounds
    background: palette.gray50,
    backgroundSecondary: palette.white,
    backgroundTertiary: palette.gray100,

    // Surfaces
    card: palette.white,
    cardSecondary: palette.gray100,
    cardTertiary: palette.gray200,

    // Text
    text: palette.gray900,
    textSecondary: palette.gray700,
    textTertiary: palette.gray500,
    textInverted: palette.white,

    // Borders
    border: palette.gray200,
    borderSecondary: palette.gray300,
    borderTertiary: palette.gray400,

    // Status
    success: palette.success500,
    successLight: palette.success400,
    successDark: palette.success600,

    warning: palette.warning500,
    warningLight: palette.warning400,
    warningDark: palette.warning600,

    error: palette.error500,
    errorLight: palette.error400,
    errorDark: palette.error600,

    info: palette.info500,
    infoLight: palette.info400,
    infoDark: palette.info600,

    // Interactive states
    notification: palette.primary600,
    notificationLight: palette.primary500,

    disabled: palette.gray400,
    disabledText: palette.gray500,

    // Special
    overlay: 'rgba(0,0,0,0.3)',
    shadow: 'rgba(0,0,0,0.1)',
  },
  spacing,
  textVariants,
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const darkTheme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    ...lightTheme.colors,
    // Base colors
    primary: palette.primary400,
    primaryLight: palette.primary300,
    primaryDark: palette.primary500,
    primaryPressed: palette.primary600,

    secondary: palette.secondary400,
    secondaryLight: palette.secondary300,
    secondaryDark: palette.secondary500,

    // Backgrounds
    background: palette.gray900,
    backgroundSecondary: palette.gray800,
    backgroundTertiary: palette.gray700,

    // Surfaces
    card: palette.gray800,
    cardSecondary: palette.gray700,
    cardTertiary: palette.gray600,

    // Text
    text: palette.gray100,
    textSecondary: palette.gray300,
    textTertiary: palette.gray500,
    textInverted: palette.black,

    // Borders
    border: palette.gray700,
    borderSecondary: palette.gray600,
    borderTertiary: palette.gray500,

    // Status
    success: palette.success400,
    successLight: palette.success300,
    successDark: palette.success500,

    warning: palette.warning400,
    warningLight: palette.warning300,
    warningDark: palette.warning500,

    error: palette.error400,
    errorLight: palette.error300,
    errorDark: palette.error500,

    info: palette.info400,
    infoLight: palette.info300,
    infoDark: palette.info500,

    // Interactive states
    notification: palette.primary300,
    notificationLight: palette.primary400,

    disabled: palette.gray600,
    disabledText: palette.gray500,

    // Special
    overlay: 'rgba(0,0,0,0.7)',
    shadow: 'rgba(0,0,0,0.3)',
  },
}

export type TTheme = typeof lightTheme
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
