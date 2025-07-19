import React, { useMemo } from 'react'

import { icons, LucideProps } from 'lucide-react-native'

import { createThemeComponent, TThemeProps } from '@/shared/theme'

import { TIcons } from './types'

type TIcon = Omit<LucideProps, 'opacity' | 'width' | 'height'> & {
  name: TIcons
}

type TIconProps = TIcon & TThemeProps

export const Icon = ({ name, ...props }: TIconProps) => {
  const LucideIcon = icons[name]

  const ThemedIcon = useMemo(
    () => createThemeComponent<TIcon>(LucideIcon),
    [LucideIcon],
  )

  return <ThemedIcon name={name} {...props} />
}
