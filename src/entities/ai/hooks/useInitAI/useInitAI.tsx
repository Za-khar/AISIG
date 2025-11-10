import { useApiQuery } from '@/shared/hooks'

import { AIService } from '../../services'
import { useAIStore } from '../../store'

export const useInitAI = () => {
  useApiQuery(AIService.getImageModels, {
    onSuccess: data => {
      console.log('data: ', data)
      useAIStore.setState({ models: data })
    },
  })
  return {}
}
