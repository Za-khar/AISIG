/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import { Navigator } from '@/app/navigation'

import { Sentry } from '@/shared/lib'

Sentry.init({
  dsn: 'https://0e389e7db1d2c15951d5218a7b21066e@o4509520996859904.ingest.de.sentry.io/4509720364384336',
})

const App = () => {
  return <Navigator />
}

export default Sentry.wrap(App)
