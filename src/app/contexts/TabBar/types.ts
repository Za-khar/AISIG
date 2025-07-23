import { ReactNode } from 'react'

export type TTabBarContext = {
  height: number
  setHeight: (value: number) => void
  visible: boolean
  setVisible: (value: boolean) => void
  hide: () => void
  show: () => void
}
export type TTabBarProviderProps = {
  children: ReactNode
}
