import { IMAGE_STORE_API_KEY } from '@env'
import axios from 'axios'

import { TResponse } from '@/shared/api/types'

import * as Types from './types'

export class ImageCloudService {
  static async postUploadImage({
    formData,
    ...params
  }: Types.TPostUploadImageApi['payload']): TResponse<
    Types.TPostUploadImageApi['response']
  > {
    return axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        ...params,
        key: IMAGE_STORE_API_KEY,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}
