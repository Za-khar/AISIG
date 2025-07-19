import { Dispatch, ReactNode, SetStateAction } from 'react'

import { ELanguages } from '@/common/i18n'

export type TLanguageProvider = {
  language: ELanguages
  setLanguage: Dispatch<SetStateAction<ELanguages>>
}

export type TLanguageProviderProps = {
  children: ReactNode
}
