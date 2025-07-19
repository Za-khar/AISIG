// src/hooks/useTheme.ts
import { useTheme as useShopifyTheme } from '@shopify/restyle'

import { TTheme } from '@/shared/theme'

export const useTheme = () => {
  return useShopifyTheme<TTheme>()
}
