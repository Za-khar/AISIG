// src/providers/ThemeProvider.tsx
import React, { createContext } from 'react'

import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { darkTheme } from '@/shared/theme'

type TThemeContextProps = {
  insets: ReturnType<typeof useSafeAreaInsets>
}

export const ThemeContext = createContext<TThemeContextProps>({
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets()

  return (
    <RestyleThemeProvider theme={{ ...darkTheme, insets }}>
      {children}
    </RestyleThemeProvider>
  )
}
