import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Badge {
  id: string
  name: string
  email: string
  eventTitle: string
  checkInURL: string
  image?: string
}

interface BadgeStore {
  data: Badge | null
  save: (badge: Badge) => void
}

export const useBadgeStore = create(
  persist<BadgeStore>(
    (set) => ({
      data: null,
      save: (badge) => set({ data: badge }),
    }),
    {
      name: 'pass.in:badge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
