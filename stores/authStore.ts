import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PLAN, STORAGE_KEYS } from '../constants/config'
import { User } from '../types'

interface AuthStore {
  user: User | null
  isLoggedIn: boolean

  setUser: (user: User) => void
  logout: () => void
  incrementAnalysisCount: () => void
  canAnalyze: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: true }),

      logout: () => set({ user: null, isLoggedIn: false }),

      incrementAnalysisCount: () =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                analysesThisMonth: state.user.analysesThisMonth + 1,
              }
            : null,
        })),

      canAnalyze: () => {
        const { user } = get()
        if (!user) return true
        if (user.plan === 'pro') return true
        return user.analysesThisMonth < PLAN.free.maxAnalysesPerMonth
      },
    }),
    {
      name: STORAGE_KEYS.user,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
