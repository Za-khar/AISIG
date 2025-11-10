import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/app/store'

import { EAIModel, TAIChat, TAIFilter, TAIMessage } from '../models'

export type TAIStore = {
  models: Array<EAIModel>
  chat: TAIChat
  filter: TAIFilter
  clear: () => void
  setChatMessages: (message: TAIMessage) => void
}

export const useAIStore = create<TAIStore>()(
  persist(
    set => ({
      models: [],
      chat: [],
      filter: {
        enhance: true,
        height: 1024,
        width: 1024,
        model: EAIModel.flux,
        transparent: false,
      },
      clear: () => set({ models: [] }),

      setChatMessages: (message: TAIMessage) =>
        set(state => ({ chat: [message, ...state.chat] }), false),
    }),
    {
      name: 'ai-storage',
      partialize: state => ({
        models: state.models,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
