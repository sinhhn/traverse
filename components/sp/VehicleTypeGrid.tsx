'use client'

import type { VehicleType } from '@/types'
import { Truck } from 'lucide-react'

export interface VehicleTypeGridProps {
  value: VehicleType | null
  onChange: (type: VehicleType) => void
}

const vehicleTypes: { type: VehicleType; label: string; desc: string }[] = [
  { type: '軽貨物', label: '軽貨物', desc: '〜350kg' },
  { type: '2t', label: '2tトラック', desc: '〜2,000kg' },
  { type: '4t', label: '4tトラック', desc: '〜4,000kg' },
  { type: '10t', label: '10tトラック', desc: '〜10,000kg' },
]

export function VehicleTypeGrid({ value, onChange }: VehicleTypeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {vehicleTypes.map(vt => {
        const isSelected = value === vt.type
        return (
          <button
            key={vt.type}
            onClick={() => onChange(vt.type)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
              ${isSelected
                ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 text-[#8B1A1A]'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'}
            `}
          >
            <Truck size={28} className={isSelected ? 'text-[#8B1A1A]' : 'text-neutral-400'} />
            <span className="font-bold text-sm">{vt.label}</span>
            <span className="text-xs text-neutral-500">{vt.desc}</span>
          </button>
        )
      })}
    </div>
  )
}
