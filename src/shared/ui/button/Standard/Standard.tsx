import React from 'react'
import { ActivityIndicator } from 'react-native'

import {
  createBox,
  createText,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle'

import { Theme } from '../../theme'

// 1. Define your variants
const buttonVariants = createVariant<Theme, 'buttonVariants'>({
  themeKey: 'buttonVariants',
  defaults: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'm',
    padding: 'm',
  },
})

// 2. Create base components
const BaseButton = createBox<Theme>()
const BaseText = createText<Theme>()

// 3. Define variant props
type ButtonProps = React.ComponentProps<typeof BaseButton> &
  VariantProps<Theme, 'buttonVariants'> & {
    loading?: boolean
    label?: string
  }

// 4. Restyle functions to apply
const restyleFunctions = [buttonVariants]

export const Standard = ({
  variant = 'primary', // default variant
  loading = false,
  label,
  children,
  ...rest
}: ButtonProps) => {
  // 5. Apply variant styles
  const props = useRestyle(restyleFunctions, { variant, ...rest })

  return (
    <BaseButton {...props}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <BaseText variant="buttonText">{label || children}</BaseText>
      )}
    </BaseButton>
  )
}
