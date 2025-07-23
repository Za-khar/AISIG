import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GenerationScreens } from '@/screens/Generation'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'

import { TGenerationStack } from './types'

const Stack = createNativeStackNavigator<TGenerationStack>()

export const GenerationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.GenerationMain}
      screenOptions={ScreenNavigationOptions}>
      <Stack.Screen
        component={GenerationScreens.Main}
        name={EScreens.GenerationMain}
      />
      <Stack.Screen
        component={GenerationScreens.Test}
        name={EScreens.HomeTest}
        options={{
          // animation: 'slide_from_bottom',
          // animationMatchesGesture: true,
          presentation: 'pageSheet',
          sheetAllowedDetents: [0.25, 0.5, 0.75, 1],
          sheetInitialDetentIndex: 2,
          sheetCornerRadius: 30,
          sheetLargestUndimmedDetentIndex: 2,
        }}
      />
    </Stack.Navigator>
  )
}
