import React, { PropsWithChildren, createContext, useState } from 'react'

import { ActivityIndicator } from 'react-native'

import Animated from 'react-native-reanimated'

import { createThemeComponent } from '@/shared/theme'

import { useTheme } from '../Theme'

const AnimatedBox = createThemeComponent(Animated.View)

const LoaderContext = createContext({
  loading: false,
  show: () => {},
  hide: () => {},
})

export default LoaderContext

export const LoaderContextProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const [loading, updateLoaderState] = useState<boolean>(false)

  const commonLoading = loading

  const show = () => {
    updateLoaderState(true)
  }

  const hide = () => {
    updateLoaderState(false)
  }

  return (
    <LoaderContext.Provider value={{ loading, show, hide }}>
      {commonLoading && (
        <AnimatedBox flex={1}>
          <ActivityIndicator size="large" color={theme.colors.black} />
        </AnimatedBox>
      )}

      {children}
    </LoaderContext.Provider>
  )
}
