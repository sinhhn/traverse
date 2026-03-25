'use client'

import type { TimeSlot } from '@/types'

export interface TimeSlotGridProps {
  value: TimeSlot | null
  onChange: (slot: TimeSlot) => void
}

const slots: { id: TimeSlot; label: string }[] = [
  { id: 'am', label: '午前中' },
  { id: '12-14', label: '12:00〜14:00' },
  { id: '14-16', label: '14:00〜16:00' },
  { id: '16-18', label: '16:00〜18:00' },
  { id: '18-20', label: '18:00〜20:00' },
  { id: 'any', label: '時間指定なし' },
]

export function TimeSlotGrid({ value, onChange }: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.map(slot => {
        const isSelected = value === slot.id
        return (
          <button
            key={slot.id}
            onClick={() => onChange(slot.id)}
            className={`
              py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all text-center
              ${isSelected
                ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 text-[#8B1A1A] font-bold'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'}
            `}
          >
            {slot.label}
          </button>
        )
      })}
    </div>
  )
}
