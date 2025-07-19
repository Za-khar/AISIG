import React, { useEffect, useState } from 'react'

import { ImageProps as RNImageProps } from 'react-native'

import {
  createBox,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle'

import { Png } from '@assets/png'

import { Theme } from '@/theme'

// 1. Create image variant
const imageVariant = createVariant<Theme, 'imageVariants'>({
  themeKey: 'imageVariants',
  defaults: {
    overflow: 'hidden',
  },
})

// 2. Create base component
const BaseImage = createBox<Theme, RNImageProps>()

// 3. Define props type
type ImageProps = React.ComponentProps<typeof BaseImage> &
  VariantProps<Theme, 'imageVariants'> & {
    source?: RNImageProps['source']
    defaultSource?: RNImageProps['defaultSource']
    onError?: () => void
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
  }

// 4. Restyle functions
const restyleFunctions = [imageVariant]

const DEFAULT_IMAGE = Png.DefaultImage

export const Image = React.memo(
  ({
    variant = 'default',
    source,
    defaultSource = DEFAULT_IMAGE,
    onError,
    ...rest
  }: ImageProps) => {
    const [error, setError] = useState(false)
    const props = useRestyle(restyleFunctions, { variant, ...rest })

    useEffect(() => {
      setError(false)
    }, [source])

    const handleError = () => {
      setError(true)
      onError?.()
    }

    return (
      <BaseImage
        {...props}
        source={error ? DEFAULT_IMAGE : source}
        defaultSource={defaultSource}
        onError={handleError}
      />
    )
  },
)

// Add display name for debugging
Image.displayName = 'Image'
