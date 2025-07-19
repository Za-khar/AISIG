import { TIconsKeys } from '@assets/svg'

export type TTab = {
  active?: boolean
  title: string
  icon: TIconsKeys
  count?: number
}
