import { useContext } from 'react'

import { TabBarContext } from './TabBar'

export const useTabBar = () => {
  const props = useContext(TabBarContext)
  return props
}
