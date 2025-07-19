import React, { useEffect, useRef, useState } from 'react'

import { EmitterSubscription, Keyboard, Platform } from 'react-native'

import { isIOS } from '@/shared/lib'

export const useKeyboardStatus = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
  const keyboardHideListener = useRef<null | EmitterSubscription>(null)
  const keyboardShowListener = useRef<null | EmitterSubscription>(null)

  const onKeyboardShow = (e: {
    endCoordinates: { height: React.SetStateAction<number> }
  }) => {
    setKeyboardHeight(e.endCoordinates.height)
    setIsOpen(true)
  }

  const onKeyboardHide = () => {
    setKeyboardHeight(0)
    setIsOpen(false)
  }

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(
      isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      onKeyboardShow,
    )
    keyboardHideListener.current = Keyboard.addListener(
      isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      onKeyboardHide,
    )

    return () => {
      keyboardShowListener.current?.remove()
      keyboardHideListener.current?.remove()
    }
  }, [])

  return {
    isOpen: isOpen,
    keyboardHeight: keyboardHeight,
    keyboardPlatform: Platform.OS,
  }
}
