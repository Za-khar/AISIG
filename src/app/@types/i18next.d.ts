import { uk } from '@/app/i18n'
import { defaultNS } from '@/app/i18n/i18n'

const resources = {
  uk,
} as const

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources
  }
}
