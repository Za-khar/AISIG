import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const ScreenNavigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const ScreenTabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
}
