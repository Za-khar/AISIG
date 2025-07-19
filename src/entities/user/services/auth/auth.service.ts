import { apiPublic } from '@/shared/api'

import { TResponse } from '@/shared/api/types'

import * as Types from './types'

export class AuthService {
  static async postSignInWithPhoneAndPassword(
    payload: Types.TPostSignInWithPhoneAndPasswordApi['payload'],
  ): TResponse<Types.TPostSignInWithPhoneAndPasswordApi['response']> {
    return apiPublic.post(`/auth/signin-with-phone-and-password`, payload)
  }
}
