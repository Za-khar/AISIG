import { PropsWithChildren } from 'react'

import { ScrollViewProps } from 'react-native'

import { BottomSheetModalProps } from '@gorhom/bottom-sheet'

export type TBottomSheetModalProps = Partial<BottomSheetModalProps> &
  PropsWithChildren<{
    mode?: 'default' | 'scroll' | 'view'
    onClose?: () => void
    enableDynamicSizing?: boolean
    pH?: number
    hideIndicator?: boolean
    scrollProps?: ScrollViewProps
  }>

export type TBottomSheetModalRef = {
  open: () => void
  close: () => void
}

export type TContainerProps = {
  pH?: number
}
