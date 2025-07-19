import { ImageProps, ImageSourcePropType } from 'react-native'

import { imageUrl } from '@/shared/lib'

import { EColors } from '../../styled'
import { TMargin } from '../../utils'

export type TImageStandard = Partial<Omit<TStyledImage, 'source'>> & {
  source?: string | null
  type?: keyof typeof imageUrl

  pngSource?: ImageSourcePropType
} & Partial<TStylesShimmer> &
  Partial<ImageProps>

export type TStylesShimmer = {
  borderRadius: number
}

export type TStyledImage = {
  w: number
  h: number
  r: number
  borderWidth?: number
  borderColor?: EColors
} & TMargin
