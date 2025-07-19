import { useLoader } from '@/shared/hooks'

export const useAuth = () => {
  const loader = useLoader()

  const login = () => {
    // if (data.login === AUTH_LOGIN && data.password === AUTH_PASSWORD) {
    //   loader.hide()
    //   dispatch(userActions.setUser({ _id: '1', login: data.login }))
    //   return
    // }
    // throw new Error('Invalid credentials')
    loader.hide()
    // dispatch(userActions.setUser({ _id: '1' }))
  }

  return { isAuthorized: false, login }
}
