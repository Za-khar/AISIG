// src/validations/types.ts
import { TFunction } from 'i18next'
import { z } from 'zod'

import { ELanguages } from '@/app/i18n'

import { getSchemas } from './schemas'

export type TSchemaBuilder = ReturnType<typeof getSchemas>
export type TSchema<TSchemaType extends z.ZodTypeAny> = z.infer<TSchemaType>

export type TValidationOptions = {
  t: TFunction<ELanguages, undefined>
}
