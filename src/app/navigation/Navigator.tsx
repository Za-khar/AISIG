import React from 'react'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { Contexts } from '../contexts'

import { Navigation } from './ref'
import { MainStack } from './stacks/Main'

export const Navigator = () => {
  return (
    <NavigationContainer
      ref={Navigation.ref}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      }}>
      <Contexts>
        <MainStack />
      </Contexts>
    </NavigationContainer>
  )
}
