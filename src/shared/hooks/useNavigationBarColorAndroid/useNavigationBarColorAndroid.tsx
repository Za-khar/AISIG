import SystemNavigationBar from 'react-native-system-navigation-bar'

import { isAndroid } from '@/shared/lib'

export const useNavigationBarColorAndroid = () => {
  const changeNavigationBarColorAndroid = async (
    color: string,
    style?: 'light' | 'dark',
  ) => {
    try {
      isAndroid &&
        (await SystemNavigationBar.setNavigationColor(
          color,
          style || 'light',
          'navigation',
        ))
    } catch (e) {}
  }
  return { changeNavigationBarColorAndroid }
}
