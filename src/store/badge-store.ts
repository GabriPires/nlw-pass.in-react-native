import { create } from 'zustand'

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

export const useBadgeStore = create<BadgeStore>((set) => ({
  data: null,
  save: (badge) => set({ data: badge }),
}))
