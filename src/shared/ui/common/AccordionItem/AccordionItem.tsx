import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type TAccordionItemProps = PropsWithChildren<{
  open: boolean
  viewKey?: string
  style?: StyleProp<ViewStyle>
  duration?: number
}>

export const AccordionItem = ({
  open = false,
  children,
  viewKey,
  style,
  duration = 300,
}: TAccordionItemProps) => {
  const height = useSharedValue(0)

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open), {
      duration,
    }),
  )
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }))

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height
        }}
        style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  )
}

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
})
