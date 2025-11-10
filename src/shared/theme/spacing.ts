import { initialWindowMetrics } from 'react-native-safe-area-context'

export const spacing: {
  none: number
  xs: number
  s: number
  m: number
  l: number
  xl: number
  xxl: number
  top: number
  bottom: number
  left: number
  right: number
  _1: number
  _2: number
} = {
  none: 0,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,

  top: initialWindowMetrics?.insets?.top || 0,
  bottom: initialWindowMetrics?.insets?.bottom || 0,
  left: initialWindowMetrics?.insets?.left || 0,
  right: initialWindowMetrics?.insets?.right || 0,

  _1: 1,
  _2: 2,
}
