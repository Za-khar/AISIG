import { TQuery } from '@/shared/api'

export type TPostUploadImageApi = TQuery<
  TPostUploadImagePayload,
  TPostUploadImageResponse
>
type TPostUploadImagePayload = {
  formData: FormData
  name?: string
  expiration?: number
}
type TPostUploadImageResponse = {
  data: {
    id: string
    title: string
    url_viewer: string
    url: string
    display_url: string
    width: string
    height: string
    size: string
    time: string
    expiration: string
    image: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    thumb: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    medium: {
      filename: string
      name: string
      mime: string
      extension: string
      url: string
    }
    delete_url: string
  }
  success: boolean
  status: number
}
