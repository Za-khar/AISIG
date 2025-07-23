import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '@/app/store'

import { EAIModel, TAIChat, TAIFilter } from '../models'

export type TAIStore = {
  models: Array<EAIModel>
  chat: TAIChat
  filter: TAIFilter
  clear: () => void
}

export const useAIStore = create<TAIStore>()(
  persist(
    set => ({
      models: [],
      chat: [],
      filter: {
        enhance: true,
        height: 600,
        width: 800,
        model: EAIModel.flux,
        transparent: false,
      },
      clear: () => set({ models: [] }),
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
