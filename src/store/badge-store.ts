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
  remove: () => void
  updateAvatar: (uri: string) => void
}

export const useBadgeStore = create(
  persist<BadgeStore>(
    (set) => ({
      data: null,
      save: (badge) => set({ data: badge }),
      remove: () => set({ data: null }),
      updateAvatar: (uri) =>
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                image: uri,
              }
            : null,
        })),
    }),
    {
      name: 'pass.in:badge',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
