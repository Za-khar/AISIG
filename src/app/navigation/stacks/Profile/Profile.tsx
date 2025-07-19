import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'

import { TProfileStack } from './types'

import { ProfileScreens } from '@/screens/Profile'

const Stack = createNativeStackNavigator<TProfileStack>()

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.ProfileMain}
      screenOptions={ScreenNavigationOptions}>
      <Stack.Screen
        component={ProfileScreens.Main}
        name={EScreens.ProfileMain}
      />
    </Stack.Navigator>
  )
}
