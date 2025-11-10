import { useEffect } from 'react'

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  withSpring,
} from 'react-native-reanimated'

import { useTabBar } from '@/app/contexts/TabBar'

export const useAnimatedTab = () => {
  const { visible, height, setHeight, setVisible } = useTabBar()

  // Use spring animation for more natural movement
  const translateY = useSharedValue(visible ? 0 : height)
  const opacity = useSharedValue(visible ? 1 : 0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    if (visible) {
      // Show animation - spring for translate and timing for opacity
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 120,
      })
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.quad),
      })
    } else {
      // Hide animation - combine both animations
      translateY.value = withSpring(height, {
        damping: 15,
        stiffness: 120,
      })
      opacity.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.quad),
      })
    }
  }, [visible, height, translateY, opacity])

  return {
    animatedStyle,
    setVisible,
    visible,
    setHeight,
    height, // Expose height for potential calculations in parent components
  }
}
