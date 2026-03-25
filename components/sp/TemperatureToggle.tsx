'use client'

import type { Temperature } from '@/types'

export interface TemperatureToggleProps {
  value: Temperature | null
  onChange: (temp: Temperature) => void
}

const temps: { type: Temperature; label: string; icon: string }[] = [
  { type: '常温', label: '常温', icon: '🌡️' },
  { type: '冷蔵', label: '冷蔵', icon: '❄️' },
  { type: '冷凍', label: '冷凍', icon: '🧊' },
]

export function TemperatureToggle({ value, onChange }: TemperatureToggleProps) {
  return (
    <div className="flex gap-2">
      {temps.map(t => {
        const isSelected = value === t.type
        return (
          <button
            key={t.type}
            onClick={() => onChange(t.type)}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-bold transition-all
              ${isSelected
                ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 text-[#8B1A1A]'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'}
            `}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
