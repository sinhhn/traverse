'use client'

import { useSearchStore } from '@/lib/store/searchStore'
import { X, Plus } from 'lucide-react'

export function FilterChips() {
  const { prefecture, vehicleType, temperature, urgentOnly, setPrefecture, setVehicleType, setTemperature, setUrgentOnly } = useSearchStore()

  const chips: { label: string; onRemove: () => void }[] = []

  if (prefecture) chips.push({ label: prefecture, onRemove: () => setPrefecture(null) })
  if (vehicleType) chips.push({ label: vehicleType, onRemove: () => setVehicleType(null) })
  if (temperature) chips.push({ label: `${temperature}`, onRemove: () => setTemperature(null) })
  if (urgentOnly) chips.push({ label: '緊急対応', onRemove: () => setUrgentOnly(false) })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(chip => (
        <div
          key={chip.label}
          className="bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 text-[#8B1A1A] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md"
        >
          <span>{chip.label}</span>
          <button onClick={chip.onRemove} className="hover:bg-[#8B1A1A]/20 rounded-full p-0.5">
            <X size={12} />
          </button>
        </div>
      ))}
      <button className="bg-white/90 border border-neutral-300 text-neutral-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-white transition-all">
        <Plus size={12} />
        <span>条件追加</span>
      </button>
    </div>
  )
}
