import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { EStacks, HomeStack, ProfileStack } from '@/app/navigation'

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
      initialRouteName={EStacks.Home}
      backBehavior="initialRoute"
      screenOptions={ScreenTabOptions}
      tabBar={tabBar}>
      <Tab.Screen name={EStacks.Home} component={HomeStack} />
      <Tab.Screen name={EStacks.Profile} component={ProfileStack} />
    </Tab.Navigator>
  )
}
