import React from 'react'

import { FlashList } from '@shopify/flash-list'
import {
  KeyboardAvoidingView,
  KeyboardGestureArea,
} from 'react-native-keyboard-controller'

import { Header } from '@/widgets/header'

import { useInitAI } from '@/entities/ai'

import { Background } from '@/shared/ui/background'
import { Input } from '@/shared/ui/input'

export const Main = () => {
  useInitAI()

  return (
    <Background.Container withStatusBar withBottomBar>
      <Header.Standard />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="translate-with-padding"
        keyboardVerticalOffset={12}>
        <KeyboardGestureArea interpolator="ios" style={{ flex: 1 }}>
          <FlashList data={[1, 2, 3]} />
        </KeyboardGestureArea>

        <Input.Standard />
      </KeyboardAvoidingView>
    </Background.Container>
  )
}
