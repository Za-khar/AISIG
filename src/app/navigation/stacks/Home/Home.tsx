import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'

import { THomeStack } from './types'

import { HomeScreens } from '@/screens/Home'

const Stack = createNativeStackNavigator<THomeStack>()

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.HomeMain}
      screenOptions={ScreenNavigationOptions}>
      <Stack.Screen component={HomeScreens.Main} name={EScreens.HomeMain} />
    </Stack.Navigator>
  )
}
