import { TAIFilter } from './ai'

export type TAIChat = Array<TAIMessage>
export type TAIMessage = {
  _id: string
  image: string
  options: TAIFilter
}
