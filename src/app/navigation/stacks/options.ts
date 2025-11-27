import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const ScreenNavigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
  statusBarTranslucent: true,
}

export const ScreenTabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
}
