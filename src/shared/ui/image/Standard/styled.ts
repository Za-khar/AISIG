import { Image } from 'react-native'

import styled from 'styled-components'

import { MARGIN } from '../../utils'

import { TStyledImage } from './types'

export const StyledImage = styled(Image)<TStyledImage>`
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  border-radius: ${({ r }) => r}px;

  border-width: ${({ borderWidth }) => borderWidth}px;
  border-color: ${({ borderColor }) => borderColor};

  ${props => MARGIN(props)};
`
