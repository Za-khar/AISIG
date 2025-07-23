import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GalleryScreens } from '@/screens/Gallery'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'

import { TGalleryStack } from './types'

const Stack = createNativeStackNavigator<TGalleryStack>()

export const GalleryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.GalleryMain}
      screenOptions={ScreenNavigationOptions}>
      <Stack.Screen
        component={GalleryScreens.Main}
        name={EScreens.GalleryMain}
      />
    </Stack.Navigator>
  )
}
