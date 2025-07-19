import React, { useMemo, useState } from 'react'

import { TouchableOpacity, View } from 'react-native'

import { useTheme } from 'styled-components'

import { useNavigation } from '@/shared/hooks'
import { Icon } from '@/shared/ui/Icon'
import { Styled, Typography } from '@/shared/ui/styled'

import { Wrapper } from '../Wrapper'

import { styles } from './styles'
import { ETitleAlign, TStandardProps } from './types'

export const Standard = ({
  title = '',
  subtitle = '',
  goBack = false,
  icon,
  iconProps = {},
  onPress,
  onGoBack,
  backIconProps = {},
  rightAction,
  leftAction,
  titleAlign = ETitleAlign.start,
  TitleComponent = Typography.Body1R,
  textColor = 'black',
  ...props
}: TStandardProps) => {
  const navigation = useNavigation()
  const { COLORS } = useTheme()
  const [leftHeight, setLeftHeight] = useState(26)

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }

    navigation.goBack()
  }

  const _leftAction = useMemo(() => {
    if (leftAction) {
      return leftAction
    }

    return (
      <Styled.FlexWrapper>
        {goBack && (
          <TouchableOpacity style={styles.touch} onPress={_onGoBack}>
            <Icon
              name="ArrowLeftOutline"
              fill={COLORS[textColor]}
              size={24}
              {...backIconProps}
            />
          </TouchableOpacity>
        )}

        <Styled.Divider width={leftHeight - 26} />
      </Styled.FlexWrapper>
    )
  }, [goBack, _onGoBack, backIconProps, titleAlign, leftAction])

  return (
    <Wrapper {...props}>
      <Styled.FlexWrapper style={styles.main} justify={'space-between'}>
        {titleAlign === ETitleAlign.center && _leftAction}

        <Styled.FlexWrapper width={'auto'} height={'100%'}>
          {titleAlign === ETitleAlign.start && _leftAction}
          <Styled.FlexWrapper
            flexDirection="column"
            width="auto"
            align="flex-start">
            <TitleComponent color={textColor}>{title}</TitleComponent>
            {!!subtitle && (
              <Typography.Body2R mTop="4px" color="neutral_500">
                {subtitle}
              </Typography.Body2R>
            )}
          </Styled.FlexWrapper>
        </Styled.FlexWrapper>

        {icon && (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Icon name={icon} {...iconProps} size={26} />
          </TouchableOpacity>
        )}

        {!!rightAction && (
          <View onLayout={e => setLeftHeight(e.nativeEvent.layout.width)}>
            {rightAction}
          </View>
        )}

        {!icon && !rightAction && <Styled.Divider width={goBack ? 32 : 0} />}
      </Styled.FlexWrapper>
    </Wrapper>
  )
}
