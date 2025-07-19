import { StyleSheet } from 'react-native'

import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import styled from 'styled-components'

import { EColors } from '../../styled'

import { TContainerProps } from './types'

export const styles = StyleSheet.create({
  background: { backgroundColor: EColors.neutral_200, borderRadius: 12 },
  indicator: {
    backgroundColor: EColors.neutral_300,
    width: 66,
    height: 6,
    marginBottom: 12,
  },
  hideIndication: { backgroundColor: EColors.transparent },
})

export const Scroll = styled(BottomSheetScrollView).attrs({
  contentContainerStyle: {},
  showsVerticalScrollIndicator: false,
})<TContainerProps>`
  flex: 1;
  padding: 0px ${props => props.pH || 0}px;
`

export const Container = styled(BottomSheetView)<TContainerProps>`
  padding: 0px ${props => props.pH || 0}px;
`
