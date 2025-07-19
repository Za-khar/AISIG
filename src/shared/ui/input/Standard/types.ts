import { StyleProp, TextStyle } from 'react-native'

import { MaskedTextInputProps } from 'react-native-mask-text'

import { TMargin } from '../../utils'

import { EColors } from './../../styled/colors'

export type TStandardInputProps = {
  value?: string
  onChange?: (text: string) => void
  label?: string
  inputProps?: Partial<MaskedTextInputProps>
  rightComponent?: (
    props: TInputCallbackProps,
  ) => React.ReactElement | null | undefined | 0
  leftComponent?: (
    props: TInputCallbackProps,
  ) => React.ReactElement | null | undefined | 0
  error?: string
  style?: StyleProp<TextStyle>
  isBottomSheet?: boolean
  onPress?: () => void
  inputContainerStyle?: StyleProp<TextStyle>
  debounce?: number
  reverseColors?: boolean
} & TMargin

export type TInputCallbackProps = {
  isFocused: boolean
}

export type TInputColorTheme = {
  textColor: keyof typeof EColors
  borderColor: keyof typeof EColors
  placeholderColor: keyof typeof EColors
}

export type TStyledInput = {
  hasLeftComponent: boolean
  hasRightComponent: boolean
}
