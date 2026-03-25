import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WizardState } from '@/types'

interface WizardStore extends WizardState {
  setField: <K extends keyof WizardState>(key: K, value: WizardState[K]) => void
  nextStep: () => void
  prevStep: () => void
  resetWizard: () => void
}

const initialState: WizardState = {
  step: 1,
  origin: '',
  destination: '',
  vehicleType: null,
  temperature: null,
  isUrgent: false,
  notes: '',
  pickupDate: null,
  pickupTimeSlot: null,
  deliveryDate: null,
  deliveryTimeSlot: null,
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      ...initialState,

      setField: (key, value) => set({ [key]: value } as Partial<WizardState>),
      nextStep: () => set(s => ({ step: Math.min(2, s.step + 1) as WizardState['step'] })),
      prevStep: () => set(s => ({ step: Math.max(1, s.step - 1) as WizardState['step'] })),
      resetWizard: () => set(initialState),
    }),
    {
      name: 'traverse-wizard',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
