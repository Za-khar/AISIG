import i18n, {
  InitOptions,
  LanguageDetectorAsyncModule,
  Services,
} from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './languages'

import { ELanguages } from './types'

const DEFAULT_LANG = ELanguages.en

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => {},
  detect: callback => {
    let lang = DEFAULT_LANG

    if (!Object.keys(resources).includes(lang)) {
      lang = DEFAULT_LANG
    }

    callback(lang)
  },
  cacheUserLanguage: async () => {},
}
export const defaultNS = DEFAULT_LANG
export const resources = {
  en: { translation: en },
}

i18n.use(initReactI18next).use(languageDetector).init({
  resources,
  fallbackLng: DEFAULT_LANG,
  // compatibilityJSON: 'v4',
  // interpolation: {
  //   escapeValue: false,
  // },
})

export default i18n
