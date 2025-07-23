import { apiAI } from '@/shared/api'

import { TResponse } from '@/shared/api/types'

import * as Types from './types'

export class AIService {
  static async getImageModels(): TResponse<
    Types.TGetImageModelsApi['response']
  > {
    return apiAI.get('https://image.pollinations.ai/models')
  }

  static async postTextToImage({
    prompt,
    ...params
  }: Types.TPostTextToImageApi['payload']): TResponse<
    Types.TPostTextToImageApi['response']
  > {
    return apiAI.post(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      {},
      {
        params,
        responseType: 'arraybuffer',
      },
    )
  }
}
