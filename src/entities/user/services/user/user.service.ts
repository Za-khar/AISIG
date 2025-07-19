import { apiPrivate, apiPublic } from '@/shared/api'

import { TResponse } from '@/shared/api/types'

import * as Types from './types'

export class UserService {
  static async getUserMe(): TResponse<Types.TGetUserMeApi['response']> {
    return apiPrivate.get(`/users/me`)
  }

  static async postUserMe(
    payload: Types.TPostUserMeApi['payload'],
  ): TResponse<Types.TPostUserMeApi['response']> {
    return apiPrivate.post(`/users/me`, payload)
  }

  static async patchUserMe(
    payload: Types.TPatchUserMeApi['payload'],
  ): TResponse<Types.TPatchUserMeApi['response']> {
    return apiPrivate.patch(`/users/me`, payload)
  }

  static async deleteUserMe(): TResponse<Types.TDeleteUserMeApi['response']> {
    return apiPrivate.delete(`/users/me`)
  }

  static async postCheckCredentials(
    payload: Types.TPostCheckCredentialsApi['payload'],
  ): TResponse<Types.TPostCheckCredentialsApi['response']> {
    return apiPublic.post(`/users/check-credentials`, payload)
  }
}
