import React from 'react'

import { Box, createThemeComponent, Text } from '@/shared/theme'

import { Icon } from '@/shared/ui/Icon'

import { THeaderStandardProps } from './types'
import { useNavigation } from '@react-navigation/native'

// const BlurBox = createThemeComponent(BlurView)

export const Standard = ({ title = '', ...props }: THeaderStandardProps) => {
  const navigation = useNavigation()

  return (
    <Box
      top={0}
      position="absolute"
      paddingTop="top"
      width={'100%'}
      paddingHorizontal={'m'}
      flexDirection={'row'}
      alignItems={'center'}
      paddingBottom={'s'}
      zIndex={2}>
      {/* <BlurBox
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        blurType="dark"
        blurAmount={10}
        shadowColor="backgroundSecondary"
        shadowOpacity={1}
        shadowRadius={5}
        borderRadius={20}
      /> */}
      <Icon name="Cat" fill="text" stroke="secondary" />

      {!!title && (
        <Text variant="h3" color="text" paddingLeft={'s'} {...props}>
          {title}
        </Text>
      )}
    </Box>
  )
}
