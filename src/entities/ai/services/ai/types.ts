import { TQuery } from '@/shared/api'

export type TGetImageModelsApi = TQuery<
  TGetImageModelsPayload,
  TGetImageModelsResponse
>
type TGetImageModelsPayload = undefined
type TGetImageModelsResponse = undefined

export type TPostTextToImageApi = TQuery<
  TPostTextToImagePayload,
  TPostTextToImageResponse
>
type TPostTextToImagePayload = {
  prompt: string
} & Partial<{
  model: string
  seed: number
  width: number
  height: number
  image: string
  nologo: boolean
  private: boolean
  enhance: boolean
  safe: boolean
  transparent: boolean
  referrer: string
}>
type TPostTextToImageResponse = ArrayBuffer
