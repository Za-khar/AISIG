import React from 'react'

import { ImageProps, Image as NativeImage } from 'react-native'

import { createThemeComponent } from '@/shared/theme'

const ThemeImage = createThemeComponent(NativeImage)

type TImageProps = React.ComponentProps<typeof ThemeImage> & ImageProps

export const Standard = React.memo((props: TImageProps) => {
  return <ThemeImage {...props} />
})
