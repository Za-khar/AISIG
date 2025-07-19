import { TQuery } from '@/shared/api'

import { TUser, TUserCreating } from '../../models'

export type TGetUserMeApi = TQuery<TGetUserMePayload, TGetUserMeResponse>
type TGetUserMePayload = undefined
type TGetUserMeResponse = TUser

export type TPostUserMeApi = TQuery<TPostUserMePayload, TPostUserMeResponse>
type TPostUserMePayload = Partial<TUserCreating>
type TPostUserMeResponse = TUser

export type TPatchUserMeApi = TQuery<TPatchUserMePayload, TPatchUserMeResponse>
type TPatchUserMePayload = Partial<TUserCreating>
type TPatchUserMeResponse = TUser

export type TDeleteUserMeApi = TQuery<
  TDeleteUserMePayload,
  TDeleteUserMeResponse
>
type TDeleteUserMePayload = undefined
type TDeleteUserMeResponse = undefined

export type TPostCheckCredentialsApi = TQuery<
  TPostCheckCredentialsPayload,
  TPostCheckCredentialsResponse
>
type TPostCheckCredentialsPayload = Partial<{
  email: string
  phone: string
  firebaseId: string
}>
type TPostCheckCredentialsResponse = {
  firebaseEmail: boolean
  firebasePhone: boolean
  login: boolean
  localEmail: boolean
  localPhone: boolean
}
