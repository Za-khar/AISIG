import React, { useState } from 'react'

import { FlatList } from 'react-native'

import { EScreens, useNavigation } from '@/app/navigation'

import { usePostTextToImage } from '@/entities/ai'
import { prompts } from '@/entities/ai/config'

import { delay } from '@/shared/lib'
import { Text, TouchableBox } from '@/shared/theme'
import { Background } from '@/shared/ui/background'
import { Image } from '@/shared/ui/image'

export const Main = () => {
  const { generate, setPrompt, image, pickImage } = usePostTextToImage()
  const navigation = useNavigation()
  const [images, setImages] = useState<Array<{ title: string; image: string }>>(
    [],
  )

  const onPress = async item => {
    setPrompt(item.prompt)
    await pickImage()
    await delay(1000)

    const img = await generate()

    setImages(prev => [
      ...prev.filter(i => i.title !== item.title),
      { title: item.title, image: img },
    ])
  }

  return (
    <Background.Container withStatusBar>
      <FlatList
        data={prompts}
        renderItem={({ item }) => (
          <TouchableBox
            height={400}
            onPress={() => navigation.navigate(EScreens.FiltersDetail)}
            width={'100%'}
            backgroundColor={'card'}
            marginBottom={'xl'}>
            <Text>{item.title}</Text>
            <Image.Standard
              height={200}
              width={200}
              source={{
                uri: images?.find(i => i.title === item.title)?.image || '',
              }}
            />
          </TouchableBox>
        )}
      />
    </Background.Container>
  )
}
