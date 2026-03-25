import { create } from 'zustand'

interface CompareStore {
  selectedIds: string[]
  addToCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  selectedIds: [],

  addToCompare: id => {
    if (get().selectedIds.length >= 3) return
    if (get().selectedIds.includes(id)) return
    set(s => ({ selectedIds: [...s.selectedIds, id] }))
  },
  removeFromCompare: id =>
    set(s => ({ selectedIds: s.selectedIds.filter(i => i !== id) })),
  clearCompare: () => set({ selectedIds: [] }),
  isInCompare: id => get().selectedIds.includes(id),
}))
