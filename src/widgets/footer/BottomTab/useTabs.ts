import { useTranslation } from 'react-i18next'

import { EStacks } from '@/app/navigation'

import { KeysOfEStacks, TUseTabs } from './types'

export const useTabs = () => {
  const { t } = useTranslation()

  const tabs: Record<KeysOfEStacks, TUseTabs> = {
    [EStacks.Home]: {
      title: t('home.main'),
      Icon: 'House',
    },
    [EStacks.Profile]: {
      title: t('profile.title'),
      Icon: 'User',
    },
  }

  return { tabs }
}
