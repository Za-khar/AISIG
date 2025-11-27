import React from 'react'

import { View } from 'react-native'

import { SystemBars } from 'react-native-edge-to-edge'

import { useTheme } from '@/app/contexts'
import { useTabBar } from '@/app/contexts/TabBar'

import { Box, createThemeComponent, TTheme } from '@/shared/theme'

import { TContainerProps } from './types'

const ThemedImageBackground = createThemeComponent(View)

export const Container = ({
  children,
  statusBarColor,
  barStyle,
  safeArea = true,
  backgroundColor = 'background',
  withBottomBar = false,
  withStatusBar = false,
  ...rest
}: TContainerProps) => {
  const theme = useTheme()
  const { height: tabBarHeight } = useTabBar()

  const safeAreaProps: {
    paddingTop: keyof TTheme['spacing']
    paddingBottom: keyof TTheme['spacing']
    paddingLeft: keyof TTheme['spacing']
    paddingRight: keyof TTheme['spacing']
  } =
    typeof safeArea === 'boolean'
      ? {
          paddingTop: safeArea ? 'top' : 'none',
          paddingBottom: safeArea ? 'bottom' : 'none',
          paddingLeft: safeArea ? 'left' : 'none',
          paddingRight: safeArea ? 'right' : 'none',
        }
      : {
          paddingTop: safeArea.top ? 'top' : 'none',
          paddingBottom: safeArea.bottom ? 'bottom' : 'none',
          paddingLeft: safeArea.left ? 'left' : 'none',
          paddingRight: safeArea.right ? 'right' : 'none',
        }

  // const statusBarBackgroundColor = statusBarColor
  //   ? theme.colors[statusBarColor]
  //   : theme.colors[backgroundColor as keyof TTheme['colors']]
  return (
    <>
      {withStatusBar && (
        <SystemBars
          style={barStyle || theme.mode === 'dark' ? 'light' : 'dark'}
        />
      )}
      <ThemedImageBackground
        flex={1}
        backgroundColor={backgroundColor}
        {...safeAreaProps}
        {...rest}>
        {children}
        {withBottomBar && (
          <Box height={tabBarHeight - theme.spacing.bottom * 2} width="100%" />
        )}
      </ThemedImageBackground>
    </>
  )
}
