import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

import MaskedViewLib from '@react-native-masked-view/masked-view'

import { MaskElement } from './MaskElement'
import { TMaskElementProps } from './types'

export const MaskedView = ({
  children,
  style = {},
  ...props
}: PropsWithChildren<
  {
    style?: StyleProp<ViewStyle>
  } & TMaskElementProps
>) => (
  <MaskedViewLib
    style={[styles.container, style]}
    maskElement={<MaskElement {...props} />}>
    {children}
  </MaskedViewLib>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
})
