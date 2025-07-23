import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FiltersScreens } from '@/screens/Filters'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'

import { TFiltersStack } from './types'

const Stack = createNativeStackNavigator<TFiltersStack>()

export const FiltersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.FiltersMain}
      screenOptions={ScreenNavigationOptions}>
      <Stack.Screen
        component={FiltersScreens.Main}
        name={EScreens.FiltersMain}
      />
    </Stack.Navigator>
  )
}
