import {
  NavigationContainerRef,
  createNavigationContainerRef,
} from '@react-navigation/native'

import { EScreens } from './screens'
import { EStacks } from './stacks'
import { TScreens } from './types'

export const navigationRef =
  createNavigationContainerRef<NavigationContainerRef<TScreens>>()

export const Navigation = {
  ref: navigationRef,
  navigate: (name: EScreens | EStacks, params?: TScreens[typeof name]) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params)
    }
  },
}
