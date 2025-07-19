import React from 'react'
import { createContext, useState } from 'react'

import { TTabBarContext, TTabBarProviderProps } from './types'

export const TabBarContext = createContext<TTabBarContext>({
  height: 0,
  setHeight: () => {},
  visible: true,
  setVisible: () => {},
})

export const TabBarWrapper = ({ children }: TTabBarProviderProps) => {
  const [height, setHeight] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(true)

  return (
    <TabBarContext.Provider value={{ height, setHeight, visible, setVisible }}>
      {children}
    </TabBarContext.Provider>
  )
}
