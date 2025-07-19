import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { EStacks } from '@/app/navigation'

import { TIcons } from '@/shared/ui/Icon'

export type KeysOfEStacks = EStacks.Home | EStacks.Profile

export type TUseTabs = {
  title: string
  icon: TIcons
}

export type TOnPressTab = {
  isFocused: boolean
  route: BottomTabBarProps['state']['routes'][0]
}
