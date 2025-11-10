import React from 'react'

import { ActivityIndicator, FlatList } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'

import { Png } from '@assets/png'

import { EScreens, useNavigation } from '@/app/navigation'

import { Header } from '@/widgets/header'

import { useInitAI, usePostTextToImage } from '@/entities/ai'

import { useAIStore } from '@/entities/ai/store'

import { Responsive } from '@/shared/lib'
import { Box, createThemeComponent, TouchableBox } from '@/shared/theme'
import { Background } from '@/shared/ui/background'
import { Icon } from '@/shared/ui/Icon'
import { Image } from '@/shared/ui/image'
import { Input } from '@/shared/ui/input'

const ThemedKeyboardAvoidingView = createThemeComponent(KeyboardAvoidingView)

export const Main = () => {
  const navigation = useNavigation()
  useInitAI()
  const { chat, setChatMessages } = useAIStore()
  const { prompt, setPrompt, pickImage, generate, loading, image } =
    usePostTextToImage()

  const onPressGenerate = async () => {
    const response = await generate()
    if (response) {
      setChatMessages({
        _id: new Date().getTime().toString(),
        image: response?.image,
        options: response?.options,
      })
    }
  }

  console.log('chat; ', chat)

  const listItemHeight = 600

  return (
    <Background.Container withStatusBar withBottomBar source={Png.Background}>
      <Header.Standard />

      <ThemedKeyboardAvoidingView
        flex={1}
        behavior="padding"
        keyboardVerticalOffset={12}>
        <FlatList
          data={loading ? [{}, ...chat] : chat}
          keyboardDismissMode="on-drag"
          pagingEnabled
          inverted
          snapToInterval={listItemHeight}
          decelerationRate="fast"
          renderItem={({ item }) => {
            if (loading) {
              return (
                <Box
                  height={listItemHeight}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <ActivityIndicator />
                </Box>
              )
            }
            return (
              <TouchableBox
                flex={1}
                height={listItemHeight}
                backgroundColor={'card'}
                activeOpacity={1}
                justifyContent={'center'}
                alignItems={'center'}
                onPress={() =>
                  navigation.navigate(EScreens.HomeTest, {
                    img: item.image,
                  })
                }>
                <Image.Standard
                  width={Responsive.wp(100)}
                  height={Responsive.proportionalHeight(
                    Responsive.wp(100),
                    item.options.width,
                    item.options.height,
                  )}
                  source={{ uri: item.image }}
                  backgroundColor={'card'}
                  sharedTransitionTag="tag2"
                />
              </TouchableBox>
            )
          }}
        />

        {!!image && (
          <Image.Standard
            width={200}
            height={200}
            source={{ uri: image }}
            backgroundColor={'card'}
          />
        )}

        <Input.Standard
          value={prompt}
          onChangeText={setPrompt}
          rightComponent={
            <>
              <TouchableBox
                width={36}
                justifyContent="center"
                alignItems="center">
                <Icon
                  name="Image"
                  size={20}
                  stroke="text"
                  onPress={pickImage}
                  disabled={loading}
                />
              </TouchableBox>

              <TouchableBox
                disabled={loading}
                width={36}
                justifyContent="center"
                onPress={onPressGenerate}
                alignItems="center">
                <Icon name="Send" size={20} stroke="text" />
              </TouchableBox>
            </>
          }
        />
      </ThemedKeyboardAvoidingView>
    </Background.Container>
  )
}
