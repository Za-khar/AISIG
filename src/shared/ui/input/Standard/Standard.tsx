// src/components/Input/Input.tsx
import React from 'react'

import { TextInput } from 'react-native'

import { useTheme } from '@/app/contexts'

import { Box, createThemeComponent, Text } from '@/shared/theme'

const ThemedInput = createThemeComponent(TextInput)

type TInputProps = {
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  value: string
  onChangeText: (text: string) => void
  inputProps?: Omit<
    React.ComponentProps<typeof ThemedInput>,
    'placeholder' | 'value' | 'onChangeText'
  >
} & React.ComponentProps<typeof Box>

export const Standard = ({
  label,
  placeholder,
  error,
  disabled = false,
  inputProps = {},
  value,
  onChangeText,
  ...props
}: TInputProps) => {
  const theme = useTheme()

  return (
    <Box {...props}>
      {label && (
        <Text variant="body2" marginBottom="xs">
          {label}
        </Text>
      )}

      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth={1}
        borderColor={error ? 'error' : 'secondary'}
        borderRadius={12}
        paddingHorizontal="m"
        paddingVertical="s"
        opacity={disabled ? 0.5 : 1}>
        <ThemedInput
          flex={1}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.black}
          editable={!disabled}
          {...inputProps}
          value={value}
          onChangeText={onChangeText}
        />
      </Box>

      {error && (
        <Text variant="caption1" color="error" marginTop="xs">
          {error}
        </Text>
      )}
    </Box>
  )
}
