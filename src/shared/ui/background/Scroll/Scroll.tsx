// src/components/layout/Scroll.tsx
import React from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import { useTheme } from '@/app/contexts'
import { useTabBar } from '@/app/contexts/TabBar'

import { createThemeComponent } from '@/shared/theme'

const BaseScrollView = createThemeComponent(KeyboardAwareScrollView)

type TScrollProps = React.ComponentProps<typeof BaseScrollView> & {
  children: React.ReactNode
  withBottomBar?: boolean
}

export const Scroll = ({
  children,
  withBottomBar = false,
  paddingHorizontal = 'm',
  ...props
}: TScrollProps) => {
  const { height: tabBarHeight } = useTabBar()
  const theme = useTheme()

  return (
    <BaseScrollView
      flex={1}
      width="100%"
      paddingHorizontal={paddingHorizontal}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: theme.spacing._1,
        paddingBottom: withBottomBar
          ? tabBarHeight - theme.spacing.bottom
          : undefined,
      }}
      {...props}>
      {children}
    </BaseScrollView>
  )
}
