import z from 'zod'

import { getSchemas } from './schemas'
import { TValidationOptions } from './types'

export * from './regex'
export * from './schemas'
export * from './types'

export { zodResolver } from '@hookform/resolvers/zod'

export const createValidationSchema = <T extends z.ZodRawShape>(
  builder: (schemas: ReturnType<typeof getSchemas>) => T,
  options: TValidationOptions,
) => {
  const schemas = getSchemas(options)
  return z.object(builder(schemas))
}

export const createEmptyValidationSchema = (
  builder: (schemas: ReturnType<typeof getSchemas>) => z.ZodType,
  options: TValidationOptions,
) => {
  const schemas = getSchemas(options)
  return builder(schemas)
}
