import { create } from 'zustand'
import type { VehicleType, Temperature } from '@/types'

interface SearchStore {
  prefecture: string | null
  vehicleType: VehicleType | null
  temperature: Temperature | null
  urgentOnly: boolean
  minVehicleCount: number | null
  targetCustomer: 'B2B' | 'B2C' | null
  availableHours: '24h' | 'weekend' | null
  activePin: string | null

  setPrefecture: (v: string | null) => void
  setVehicleType: (v: VehicleType | null) => void
  setTemperature: (v: Temperature | null) => void
  setUrgentOnly: (v: boolean) => void
  setMinVehicleCount: (v: number | null) => void
  setTargetCustomer: (v: 'B2B' | 'B2C' | null) => void
  setAvailableHours: (v: '24h' | 'weekend' | null) => void
  setActivePin: (id: string | null) => void
  clearFilters: () => void
}

export const useSearchStore = create<SearchStore>(set => ({
  prefecture: null,
  vehicleType: null,
  temperature: null,
  urgentOnly: false,
  minVehicleCount: null,
  targetCustomer: null,
  availableHours: null,
  activePin: null,

  setPrefecture: v => set({ prefecture: v }),
  setVehicleType: v => set({ vehicleType: v }),
  setTemperature: v => set({ temperature: v }),
  setUrgentOnly: v => set({ urgentOnly: v }),
  setMinVehicleCount: v => set({ minVehicleCount: v }),
  setTargetCustomer: v => set({ targetCustomer: v }),
  setAvailableHours: v => set({ availableHours: v }),
  setActivePin: id => set({ activePin: id }),
  clearFilters: () => set({
    prefecture: null, vehicleType: null, temperature: null,
    urgentOnly: false, minVehicleCount: null, targetCustomer: null, availableHours: null,
  }),
}))
