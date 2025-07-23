import { TPostTextToImageApi } from '../services'

export enum EAIModel {
  flux = 'flux',
  kontext = 'kontext',
}

export const AI_MODELS = [EAIModel.flux, EAIModel.kontext]

export type TAIFilter = Pick<
  TPostTextToImageApi['payload'],
  'model' | 'height' | 'width' | 'enhance' | 'transparent'
>
