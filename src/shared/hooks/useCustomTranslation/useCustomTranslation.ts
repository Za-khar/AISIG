import { useTranslation } from 'react-i18next'

import { getTranslationKey } from './utils'

export const useCustomTranslation = () => {
  const { t, keys } = useTranslation()

  const translateWithCount = (key: string, count: number): string => {
    // Use your custom function to get the appropriate translation based on the count
    const translateKey = getTranslationKey(count, key)

    const translation = t(translateKey as keyof typeof keys, { count })

    return translation
  }

  return { t, translateWithCount }
}
