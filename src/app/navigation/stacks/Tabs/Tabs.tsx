import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {
  EStacks,
  FiltersStack,
  GalleryStack,
  GenerationStack,
} from '@/app/navigation'

import { Footer } from '@/widgets/footer'

import { ScreenTabOptions } from '../options'

import { TTabsStack } from './types'

const Tab = createBottomTabNavigator<TTabsStack>()

const tabBar = (props: BottomTabBarProps) => {
  return <Footer.BottomTab {...props} />
}

export const TabsStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={EStacks.Generation}
      backBehavior="initialRoute"
      screenOptions={ScreenTabOptions}
      tabBar={tabBar}>
      <Tab.Screen name={EStacks.Generation} component={GenerationStack} />
      <Tab.Screen name={EStacks.Filters} component={FiltersStack} />
      <Tab.Screen name={EStacks.Gallery} component={GalleryStack} />
    </Tab.Navigator>
  )
}
