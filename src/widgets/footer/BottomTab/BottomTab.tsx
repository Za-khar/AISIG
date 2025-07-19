import React, { useCallback, useEffect } from 'react'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import Animated from 'react-native-reanimated'

import { EScreens } from '@/app/navigation'
import { whiteList } from '@/app/navigation/stacks/Tabs/whiteList'

import { Box, createThemeComponent, Text, TouchableBox } from '@/shared/theme'

import { Icon } from '@/shared/ui/Icon'

import { useAnimatedTab } from './useAnimatedTab'
import { useTabs } from './useTabs'

const AnimatedBox = createThemeComponent(Animated.View)

export const BottomTab = ({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { tabs } = useTabs()
  const theme = useTheme()
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
    (route: any, isFocused: boolean) => {
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
    (route: any, isFocused: boolean) => {
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
      backgroundColor="background"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      minHeight={68}
      paddingBottom="m"
      paddingTop="s"
      zIndex={2}
      borderTopWidth={1}
      borderTopColor="blue500"
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const tab = tabs[route.name as keyof typeof tabs]
        const color = isFocused ? 'primary' : 'text'

        return (
          <TouchableBox
            key={route.key}
            flex={1}
            alignItems="center"
            justifyContent="center"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => onPress(route, isFocused)}
            onLongPress={() => onLongPress(route, isFocused)}>
            <Box alignItems="center">
              <Icon name={tab.icon} size={24} />
              <Text variant="body1" color="black" marginTop="xs">
                {tab.title}
              </Text>
            </Box>
          </TouchableBox>
        )
      })}
    </AnimatedBox>
  )
}
