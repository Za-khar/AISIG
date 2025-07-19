import { StyleSheet, View } from 'react-native'

import styled from 'styled-components'

import { Typography } from '@/shared/ui/styled'

export const Container = styled(View)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const Title = styled(Typography.Body2R)`
  margin-top: 4px;
`

export const styles = StyleSheet.create({
  main: { paddingHorizontal: 5 },
})
