import React, { useCallback, useEffect } from 'react'

import { Pressable } from 'react-native'

import { BlurView } from '@react-native-community/blur'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  NavigationRoute,
  ParamListBase,
  Route,
} from '@react-navigation/native'
import Animated from 'react-native-reanimated'

import { EScreens } from '@/app/navigation'
import { whiteList } from '@/app/navigation/stacks/Tabs/whiteList'

import { Box, createThemeComponent, Text } from '@/shared/theme'

import { Icon } from '@/shared/ui/Icon'

import { useAnimatedTab } from './useAnimatedTab'
import { useTabs } from './useTabs'

const AnimatedBox = createThemeComponent(Animated.View)
const PressableBox = createThemeComponent(Pressable)
const BlurBox = createThemeComponent(BlurView)

export const BottomTab = ({ state, navigation }: BottomTabBarProps) => {
  const { tabs } = useTabs()
  const { visible, setVisible, animatedStyle, setHeight } = useAnimatedTab()

  useEffect(() => {
    let currentRoute = state.routes[state.index]

    while (currentRoute.state) {
      currentRoute = currentRoute.state.routes[
        currentRoute.state.index as number
      ] as Route<EScreens>
    }

    const focusedScreen = ((
      getFocusedRouteNameFromRoute(currentRoute) ??
      currentRoute.name.replace('Stack', 'Main')
    ).replace('Screen', '') + 'Screen') as EScreens

    setVisible(whiteList.includes(focusedScreen))
  }, [state])

  const onPress = useCallback(
    (route: NavigationRoute<ParamListBase, string>, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      })

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, {
          name: route.name,
          merge: true,
        })
      }
    },
    [navigation],
  )

  const onLongPress = useCallback(
    (route: NavigationRoute<ParamListBase, string>) => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      })
    },
    [navigation],
  )

  if (!visible) return null

  return (
    <AnimatedBox
      style={[animatedStyle]}
      flexDirection="row"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      minHeight={68}
      paddingBottom="bottom"
      paddingTop="s"
      zIndex={2}
      overflow="hidden"
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      <BlurBox
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        blurType="dark"
        blurAmount={10}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const tab = tabs[route.name as keyof typeof tabs]

        return (
          <PressableBox
            key={route.key}
            flex={1}
            alignItems="center"
            justifyContent="center"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => onPress(route, isFocused)}
            onLongPress={() => onLongPress(route)}>
            <Box alignItems="center">
              <Icon
                name={tab.icon}
                size={24}
                stroke={isFocused ? 'secondary' : 'cardTertiary'}
              />
              <Text
                variant="body1"
                color={isFocused ? 'secondary' : 'cardTertiary'}
                marginTop="xs">
                {tab.title}
              </Text>
            </Box>
          </PressableBox>
        )
      })}
    </AnimatedBox>
  )
}
