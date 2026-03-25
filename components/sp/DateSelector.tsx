'use client'

export interface DateSelectorProps {
  value: string | null
  onChange: (dateStr: string) => void
}

function getDateChips() {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return {
      dateStr: date.toISOString().split('T')[0],
      dayLabel: i === 0 ? '今日' : i === 1 ? '明日' : date.toLocaleDateString('ja-JP', { weekday: 'short' }),
      dateNumber: date.getDate(),
      month: date.getMonth() + 1,
    }
  })
}

export function DateSelector({ value, onChange }: DateSelectorProps) {
  const chips = getDateChips()

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {chips.map(chip => {
        const isSelected = value === chip.dateStr
        return (
          <button
            key={chip.dateStr}
            onClick={() => onChange(chip.dateStr)}
            className={`
              flex-shrink-0 flex flex-col items-center gap-0.5 w-14 py-3 rounded-xl border-2 transition-all
              ${isSelected
                ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 text-[#8B1A1A]'
                : 'border-neutral-200 bg-white text-neutral-600'}
            `}
          >
            <span className="text-[10px] font-medium">{chip.dayLabel}</span>
            <span className="text-lg font-bold">{chip.dateNumber}</span>
            <span className="text-[10px] text-neutral-400">{chip.month}月</span>
          </button>
        )
      })}
    </div>
  )
}
