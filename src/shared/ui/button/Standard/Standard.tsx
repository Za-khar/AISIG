import React from 'react'

import {
  BoxProps,
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle'

import { Box, TTheme } from '@/shared/theme'

// 1. Define your variants
const buttonVariants = createVariant<TTheme, 'buttonVariants'>({
  themeKey: 'buttonVariants',
})

const Container = createRestyleComponent<
  VariantProps<TTheme, 'buttonVariants'> & BoxProps<TTheme>,
  TTheme
>([buttonVariants], Box)

// 2. Create base components
const BaseButton = createBox<TTheme>()
const BaseText = createText<TTheme>()

// 3. Define variant props
type ButtonProps = React.ComponentProps<typeof BaseButton> &
  VariantProps<TTheme, 'buttonVariants'> & {
    label?: string
  }

export const Standard = ({ label, children, ...rest }: ButtonProps) => {
  return (
    <BaseButton {...rest}>
      <BaseText variant="body1">{label || children}</BaseText>
    </BaseButton>
  )
}
