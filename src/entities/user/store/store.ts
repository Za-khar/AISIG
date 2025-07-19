import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/app/store'

import { TUser } from '../models'
import { TGetUserMeApi } from '../services'

export type TUserStore = {
  user: TUser | null
  setUser: (user: TGetUserMeApi['response']) => void
  clear: () => void
}

export const useUserStore = create<TUserStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      clear: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: state => ({
        user: state.user,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
