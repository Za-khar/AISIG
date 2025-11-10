import React, { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, TextInput } from 'react-native'

import { LinearGradient } from 'react-native-linear-gradient'

import { useTheme } from '@/app/contexts'

import { Box, createThemeComponent, ThemedInput } from '@/shared/theme'

const defaultHeight = 36
const lineHeight = 20 // Adjust based on your font size
const paddingVertical = 8
const charsPerLineEstimate = 8 // Adjust based on your font size

const ThemedGradientBorder = createThemeComponent(LinearGradient)
const ThemedGradientBackground = createThemeComponent(LinearGradient)

type TInputProps = {
  placeholder?: string
  disabled?: boolean
  value: string
  onChangeText: (text: string) => void
  inputProps?: Omit<
    React.ComponentProps<typeof ThemedInput>,
    'placeholder' | 'value' | 'onChangeText'
  >
  rightComponent?: React.ReactNode
} & React.ComponentProps<typeof Box>

export const Standard = ({
  placeholder,
  disabled = false,
  value = '', // Default empty string
  inputProps = {},
  onChangeText,
  rightComponent,
  ...props
}: TInputProps) => {
  const theme = useTheme()
  const maxHeight = 200
  const [height, setHeight] = useState(defaultHeight)
  const [width, setWidth] = useState(0)
  const textRef = useRef<TextInput>(null)

  const calculateLineCount = (text: string) => {
    if (!width || width <= 0) return 1

    const charsPerLine = Math.max(1, Math.floor(width / charsPerLineEstimate))
    const manualBreaks = (text.match(/\n/g) || []).length + 1
    const wrappedLines = Math.ceil(
      text.replace(/\n/g, '').length / charsPerLine,
    )
    return Math.max(manualBreaks) + Math.max(wrappedLines - 1, 0)
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    console.log(event)
    const newWidth = event.nativeEvent.layout.width
    if (newWidth !== width) {
      setWidth(newWidth)
    }
  }

  useEffect(() => {
    const lines = calculateLineCount(value)
    const newHeight = Math.max(
      defaultHeight,
      lines * lineHeight + paddingVertical * 2,
    )
    if (newHeight !== height && newHeight <= maxHeight) {
      setHeight(newHeight)
    }
  }, [value, width])

  return (
    <ThemedGradientBorder
      width="100%"
      colors={[
        theme.colors.primaryLight,
        theme.colors.primary,
        theme.colors.primaryDark,
      ]}
      useAngle
      angle={-190}
      alignItems="center"
      justifyContent="center"
      overflow={'hidden'}
      borderRadius={8}
      {...props}>
      <Box width="100%" padding="_1" flexDirection="row" overflow="hidden">
        <ThemedGradientBackground
          backgroundColor="background"
          colors={[theme.colors.background, theme.colors.background]}
          useAngle
          angle={-190}
          borderRadius={8}
          flexDirection="row"
          flex={1}
          width="100%">
          <ThemedInput
            ref={textRef}
            flex={1}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textTertiary}
            editable={!disabled}
            multiline
            value={value}
            borderRadius={7}
            paddingHorizontal="s"
            paddingVertical="s"
            textAlignVertical="top"
            color="text"
            fontSize={16}
            onLayout={handleLayout}
            onChangeText={onChangeText}
            height={height}
            style={{
              color: theme.colors.text,
              height,
            }}
            variant="body2"
            {...inputProps}
          />
        </ThemedGradientBackground>

        {rightComponent}
      </Box>
    </ThemedGradientBorder>
  )
}
