import React, { ReactNode } from 'react'

import { StyleSheet } from 'react-native'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SWRConfig } from 'swr'

import { swrPersistMiddleware } from '@/shared/hooks'

import { LanguageProvider } from './Language'
import { LoaderContextProvider } from './Loader'

import { TabBarWrapper } from './TabBar'
import { ThemeProvider } from './Theme'

type TContext = {
  children: ReactNode
}

export const Contexts = ({ children }: TContext) => {
  return (
    <SWRConfig value={{ use: [swrPersistMiddleware] }}>
      <SafeAreaProvider style={styles.gestureHandlerContainer}>
        <GestureHandlerRootView style={styles.gestureHandlerContainer}>
          <ThemeProvider>
            <LoaderContextProvider>
              <LanguageProvider>
                <KeyboardProvider>
                  <TabBarWrapper>
                    <BottomSheetModalProvider>
                      {children}
                    </BottomSheetModalProvider>
                  </TabBarWrapper>
                </KeyboardProvider>
              </LanguageProvider>
            </LoaderContextProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SWRConfig>
  )
}

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
})
