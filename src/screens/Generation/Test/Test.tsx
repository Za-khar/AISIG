import React from 'react'

import { useRoute } from '@react-navigation/native'

import { Image } from '@/shared/ui/image'

export const Test = () => {
  const { params } = useRoute()
  return (
    <Image.Standard
      width={500}
      height={500}
      source={{ uri: params.img }}
      backgroundColor={'card'}
      sharedTransitionTag="tag2"
    />
  )
}
