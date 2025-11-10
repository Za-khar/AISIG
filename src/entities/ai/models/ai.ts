import { TPostTextToImageApi } from '../services'

export enum EAIModel {
  flux = 'flux',
  kontext = 'kontext',
  turbo = 'turbo',
}

export const AI_MODELS = [EAIModel.flux, EAIModel.kontext, EAIModel.turbo]

export type TAIFilter = Pick<
  TPostTextToImageApi['payload'],
  'model' | 'height' | 'width' | 'enhance' | 'transparent'
>
