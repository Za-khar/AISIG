import React, { useMemo } from 'react'

import { icons, LucideProps } from 'lucide-react-native'

import { useTheme } from '@/app/contexts'

import { createThemeComponent, TTheme, TThemeProps } from '@/shared/theme'

import { TIcons } from './types'

type TIcon = Omit<LucideProps, 'opacity' | 'width' | 'height'> & {
  name: TIcons
}

type TIconProps = TIcon &
  TThemeProps & {
    fill?: keyof TTheme['colors']
    stroke?: keyof TTheme['colors']
  }

export const Icon = ({ name, fill, stroke, ...props }: TIconProps) => {
  const { colors } = useTheme()
  const LucideIcon = icons[name]

  const ThemedIcon = useMemo(
    () => createThemeComponent<TIcon>(LucideIcon),
    [LucideIcon],
  )

  const themeProps = {
    ...(fill && { fill: colors[fill] }),
    ...(stroke && { color: colors[stroke] }),
    ...props,
  }

  return <ThemedIcon name={name} {...themeProps} />
}
