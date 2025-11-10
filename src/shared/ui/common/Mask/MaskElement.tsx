import React from 'react'
import { View, StyleSheet } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { isAndroid } from '@/shared/lib'

import { TMaskElementProps } from './types'

export const MaskElement = ({
  style = {},
  colors,
  locations,
  end,
  hideBottomBar = true,
  start,
}: TMaskElementProps) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={colors || ['#000000', '#00000001']}
        locations={locations || [0, 0.6]}
        style={styles.linearGradient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
  },
  container: {
    flex: 1,
  },
})
