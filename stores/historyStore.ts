import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../constants/config'
import { AnalysisEntry } from '../types'

interface HistoryStore {
  entries: AnalysisEntry[]

  addEntry: (entry: AnalysisEntry) => void
  removeEntry: (id: string) => void
  clearHistory: () => void
  getEntryById: (id: string) => AnalysisEntry | undefined
  getCachedByHash: (hash: string) => AnalysisEntry | undefined
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [entry, ...state.entries],
        })),

      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),

      clearHistory: () => set({ entries: [] }),

      getEntryById: (id) => get().entries.find((e) => e.id === id),

      getCachedByHash: (hash) => get().entries.find((e) => e.pdfHash === hash),
    }),
    {
      name: STORAGE_KEYS.analyses,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
