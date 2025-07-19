import { View } from 'react-native'

import styled from 'styled-components'

export const Header = styled(View)`
  justify-content: center;
`

export const BarHeight = styled(View).attrs({
  pointerEvents: 'none',
})<{ height: number }>`
  height: ${({ height }) => height}px;
`
