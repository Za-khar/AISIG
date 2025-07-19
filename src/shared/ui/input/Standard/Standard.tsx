// src/components/Input/Input.tsx
import React, { useMemo } from 'react'

import { useTheme } from '@/app/contexts'

import { Box, Text } from '@/shared/theme'

import { Icon } from '../../Icon'

type InputType = 'text' | 'password' | 'phone' | 'code' | 'select'

type InputProps = React.ComponentProps<typeof BaseInput> & {
  type?: InputType
  label?: string
  placeholder?: string
  error?: string
  icon?: IconProps['name']
  iconPosition?: 'left' | 'right'
  disabled?: boolean
}

export const Input = ({
  type = 'text',
  label,
  placeholder,
  error,
  icon,
  iconPosition = 'left',
  disabled = false,
  ...props
}: InputProps) => {
  const theme = useTheme()

  // Input type specific configurations
  const inputConfig = useMemo(() => {
    const base = {
      secureTextEntry: false,
      keyboardType: 'default' as const,
      autoComplete: 'off' as const,
      icon: undefined as IconProps['name'] | undefined,
    }

    switch (type) {
      case 'password':
        return {
          ...base,
          secureTextEntry: true,
          autoComplete: 'password',
          icon: 'eye', // Default icon for password
        }
      case 'phone':
        return {
          ...base,
          keyboardType: 'phone-pad',
          autoComplete: 'tel',
          icon: 'phone',
        }
      case 'code':
        return {
          ...base,
          keyboardType: 'number-pad',
          autoComplete: 'off',
          icon: 'lock',
        }
      case 'select':
        return {
          ...base,
          editable: false,
          icon: 'chevron-down',
        }
      default:
        return base
    }
  }, [type])

  return (
    <Box>
      {label && (
        <Text variant="body2" marginBottom="xs">
          {label}
        </Text>
      )}

      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth={1}
        borderColor={error ? 'error' : 'border'}
        borderRadius="s"
        paddingHorizontal="m"
        paddingVertical="s"
        backgroundColor={disabled ? 'backgroundDisabled' : 'background'}
        opacity={disabled ? 0.5 : 1}>
        {icon && iconPosition === 'left' && (
          <Icon name={icon} size={20} color="textSecondary" />
        )}

        <BaseInput
          flex={1}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={inputConfig.secureTextEntry}
          keyboardType={inputConfig.keyboardType}
          autoComplete={inputConfig.autoComplete}
          editable={!disabled}
          {...props}
        />

        {(inputConfig.icon || icon) && iconPosition === 'right' && (
          <Icon
            name={icon || inputConfig.icon}
            size={20}
            color="textSecondary"
          />
        )}
      </Box>

      {error && (
        <Text variant="caption1" color="error" marginTop="xs">
          {error}
        </Text>
      )}
    </Box>
  )
}
