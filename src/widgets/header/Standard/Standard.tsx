import React from 'react'

import { BlurView } from '@react-native-community/blur'

import { useNavigation } from '@/app/navigation'

import { Box, createThemeComponent, Text } from '@/shared/theme'

import { Icon } from '@/shared/ui/Icon'

import { THeaderStandardProps } from './types'

const BlurBox = createThemeComponent(BlurView)

export const Standard = ({ title = '', ...props }: THeaderStandardProps) => {
  const navigation = useNavigation()

  return (
    <Box
      top={0}
      position="absolute"
      paddingTop="top"
      overflow="hidden"
      borderBottomRightRadius={20}
      borderBottomLeftRadius={20}
      width={'100%'}
      paddingHorizontal={'m'}
      flexDirection={'row'}
      alignItems={'center'}
      paddingBottom={'s'}
      zIndex={2}>
      <BlurBox
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        blurType="dark"
        blurAmount={10}
      />
      <Icon name="Cat" fill="text" stroke="secondary" />

      {!!title && (
        <Text variant="h3" color="text" paddingLeft={'s'} {...props}>
          {title}
        </Text>
      )}
    </Box>
  )
}
