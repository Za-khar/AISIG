import { useEffect } from 'react'

import { useIsFocused } from '@react-navigation/native'

import {
  AndroidSoftInputModes,
  KeyboardController,
} from 'react-native-keyboard-controller'

export const useKeyboardMode = (
  inputMode: keyof typeof AndroidSoftInputModes = 'SOFT_INPUT_ADJUST_RESIZE',
) => {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      KeyboardController.setInputMode(AndroidSoftInputModes[inputMode])
    } else {
      KeyboardController.setDefaultMode()
    }
  }, [isFocused])

  return { inputMode }
}
