export type TUser = {
  _id: string
}

export type TUserCreating = {
  email: string
  phone: string
  name: string
  secondName: string
  promotionPush: boolean
  noveltyPush: boolean
  password: string
}
