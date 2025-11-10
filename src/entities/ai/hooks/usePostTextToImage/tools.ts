import { Buffer } from 'buffer'

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  return Buffer.from(buffer).toString('base64')
}
