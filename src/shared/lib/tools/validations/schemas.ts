// src/validations/schemas.ts
import { z } from 'zod'

import { ValidationRegex } from './regex'
import { TValidationOptions } from './types'

export const getSchemas = ({ t }: TValidationOptions) => ({
  name: z
    .string({
      error: t('validation.required'),
    })
    .min(1, t('validation.min', { value: 1 }))
    .max(
      50,
      t('validation.max', {
        value: 50,
      }),
    ),
  optionalText: z
    .string()
    .max(
      1000,
      t('validation.max', {
        value: 1000,
      }),
    )
    .optional()
    .or(z.literal('')),

  requiredNumber: z
    .number({
      error: t('validation.required'),
    })
    .or(
      z
        .string({
          error: t('validation.required'),
        })
        .min(1, t('validation.min', { value: 1 }))
        .regex(ValidationRegex.number, t('validation.number')),
    ),
  requiredFloat: z
    .number({
      error: t('validation.required'),
    })
    .or(
      z
        .string({
          error: t('validation.required'),
        })
        .min(1, t('validation.min', { value: 1 }))
        .regex(ValidationRegex.float, t('validation.number')),
    ),
  requiredString: z
    .string({
      error: t('validation.required'),
    })
    .min(1, t('validation.min', { value: 1 })),
  email: z.email({
    message: t('validation.email'),
    error: t('validation.required'),
  }),
  bool: z.boolean(),
})
