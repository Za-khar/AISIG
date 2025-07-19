import { TQuery } from '@/shared/api'

export type TPostSignInWithPhoneAndPasswordApi = TQuery<
  TPostSignInWithPhoneAndPasswordPayload,
  TPostSignInWithPhoneAndPasswordResponse
>
type TPostSignInWithPhoneAndPasswordPayload = {
  phone: string
  password: string
}
type TPostSignInWithPhoneAndPasswordResponse = string
