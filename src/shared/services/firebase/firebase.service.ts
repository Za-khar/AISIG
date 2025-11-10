import auth, { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth'

import Toast from 'react-native-toast-message'

import { Sentry } from '@/shared/lib'

import { firebaseErrors } from './config'

type TPhoneAuthState = 'sent' | 'timeout' | 'verified' | 'error'

class FirebaseService {
  private confirmation: FirebaseAuthTypes.ConfirmationResult | undefined
  private snapshot: FirebaseAuthTypes.PhoneAuthSnapshot | undefined
  private unsubscribeInstance?: () => void

  // Auth state changed
  public subscribe(cb: (user: FirebaseAuthTypes.User | null) => void) {
    this.unsubscribeInstance = getAuth().onAuthStateChanged(cb)
    return this.unsubscribeInstance
  }

  public unsubscribe() {
    this.unsubscribeInstance && this.unsubscribeInstance()
  }

  // Sign in with phone
  public async signInWithPhone(
    phoneNumber: string,
    resend: boolean | undefined = false,
  ) {
    const codeConfirm = await getAuth().signInWithPhoneNumber(
      phoneNumber,
      resend,
    )
    this.confirmation = codeConfirm
  }

  public async signInCustomToken(customToken: string) {
    return auth().signInWithCustomToken(customToken)
  }

  // Confirm verification code
  public async confirmCode(code: string) {
    if (!this.confirmation) throw Error('Nothing to confirm')
    await this.confirmation?.confirm(code)
  }

  // Verify phone number
  public async verifyPhoneNumber(
    phone: string,
    resend: boolean | undefined = false,
    callbackSuccess?: (state: TPhoneAuthState) => void,
    callbackFailure?: (state: TPhoneAuthState) => void,
  ) {
    return getAuth()
      .verifyPhoneNumber(phone, resend)
      .on('state_changed', snap => {
        if (snap?.state === 'sent' || snap?.state === 'verified') {
          this.snapshot = snap
          callbackSuccess?.(snap?.state)
        } else {
          callbackFailure?.(snap?.state)
        }
      })
      .catch(err => {
        this.validateError(err)
      })
  }

  // Link phone number
  public async linkPhoneNumber(code: string) {
    if (!this.snapshot) throw Error('Nothing to confirm')
    const credential = auth.PhoneAuthProvider.credential(
      this.snapshot.verificationId,
      code,
    )
    return getAuth().currentUser?.updatePhoneNumber(credential)
  }

  // Unlink phone number
  public async unlinkUserPhone() {
    return getAuth().currentUser?.unlink(auth.PhoneAuthProvider.PROVIDER_ID)
  }

  // Get current user
  public getUser() {
    const user = getAuth()?.currentUser
    return user
  }

  // Sign out user
  public async signOut() {
    await getAuth()?.signOut?.()
  }

  // Get token
  public async getToken() {
    return getAuth()?.currentUser?.getIdToken(true)
  }

  public async validateError(error: unknown) {
    console.log(error)
    const err = error as { code?: string; message?: string }

    if (err?.code) {
      Sentry.captureException(error)
      const existError = firebaseErrors.includes(err.code)

      if (existError) {
        Toast.show({ type: 'error', text1: `firebase_error.${err.code}` })
      }
    }
  }

  public async getIdToken(newToken?: boolean) {
    try {
      const token = await getAuth().currentUser?.getIdToken(!!newToken)
      return token
    } catch (e) {
      return null
    }
  }
}

export default new FirebaseService()
