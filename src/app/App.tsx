/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import { Navigator } from '@/app/navigation'

import { Sentry } from '@/shared/lib'

const App = () => {
  return <Navigator />
}

export default Sentry.wrap(App)
