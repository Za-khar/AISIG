import React from 'react'

import { useTheme } from 'styled-components'

import { Icon } from '@/shared/ui/Icon'
import { Styled } from '@/shared/ui/styled'

import * as S from './styles'
import { TTab } from './types'

export const Tab = ({ title, icon, active }: TTab) => {
  const { COLORS } = useTheme()

  const color: keyof typeof COLORS = active ? 'primary_500' : 'black'

  return (
    <S.Container>
      <Styled.FlexWrapper
        flexDirection={'column'}
        style={S.styles.main}
        width={'auto'}>
        <Icon name={icon} size={24} fill={COLORS[color]} />
      </Styled.FlexWrapper>

      <S.Title color={color}>{title}</S.Title>
    </S.Container>
  )
}
