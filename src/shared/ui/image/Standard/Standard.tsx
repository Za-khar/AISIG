import React from 'react'

import { ImageProps } from 'react-native'

import Animated from 'react-native-reanimated'

import { createThemeComponent } from '@/shared/theme'

const ThemeImage = createThemeComponent(Animated.Image)

type TImageProps = React.ComponentProps<typeof ThemeImage> & ImageProps

export const Standard = React.memo((props: TImageProps) => {
  return <ThemeImage {...props} />
})
