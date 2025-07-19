import { PropsWithChildren } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TThemeProps = PropsWithChildren

export type TThemeContextProps = {}

export type TShadows = Record<'card' | 'footer' | 'toast', StyleProp<ViewStyle>>
