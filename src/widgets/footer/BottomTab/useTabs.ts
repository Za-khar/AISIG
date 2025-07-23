import { useTranslation } from 'react-i18next'

import { EStacks } from '@/app/navigation'

import { KeysOfEStacks, TUseTabs } from './types'

export const useTabs = () => {
  const { t } = useTranslation()

  const tabs: Record<KeysOfEStacks, TUseTabs> = {
    [EStacks.Generation]: {
      title: t('tabs.generate'),
      icon: 'Sparkles',
    },
    [EStacks.Filters]: {
      title: t('tabs.filters'),
      icon: 'Images',
    },
    [EStacks.Gallery]: {
      title: t('tabs.gallery'),
      icon: 'GalleryHorizontal',
    },
  }

  return { tabs }
}
