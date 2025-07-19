import { TScreens } from '@/navigation'

declare global {
  namespace ReactNavigation {
    type RootParamList = TScreens
  }
}
