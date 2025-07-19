import { useEffect } from 'react'

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useTabBar } from '@/app/contexts/TabBar'

export const useAnimatedTab = () => {
  const { visible, height, setHeight, setVisible } = useTabBar()

  const x = useSharedValue(visible ? 0 : height)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: x.value,
        },
      ],
    }
  }, [x])

  useEffect(() => {
    if (visible) {
      x.value = withTiming(0)
      return
    }
    if (!visible) {
      x.value = withTiming(height)

      return
    }
  }, [visible, x, height])

  return { animatedStyle, setVisible, visible, setHeight }
}
