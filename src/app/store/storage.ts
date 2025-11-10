import { STORAGE_ID, STORAGE_KEY } from '@env'
import { createMMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

// Create an MMKV instance
export const storage = createMMKV({
  id: STORAGE_ID,
  path: `aisig/storage`,
  encryptionKey: STORAGE_KEY,
  mode: 'multi-process',
  readOnly: false,
})

// Configure Zustand to use MMKV for state persistence
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value)
  },
  getItem: name => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: name => {
    storage.remove(name)
  },
}

export default zustandStorage
