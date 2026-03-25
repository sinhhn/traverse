'use client'

import { Pencil } from 'lucide-react'

export interface ConditionSummaryChipProps {
  conditions: string
  onEdit?: () => void
}

export function ConditionSummaryChip({ conditions, onEdit }: ConditionSummaryChipProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-burgundy-light rounded-xl border border-[#8B1A1A]/10">
      <p className="flex-1 text-sm text-[#8B1A1A] font-medium truncate">{conditions}</p>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex-shrink-0 p-1.5 rounded-full hover:bg-[#8B1A1A]/10 transition-colors"
          aria-label="条件を変更"
        >
          <Pencil size={14} className="text-[#8B1A1A]" />
        </button>
      )}
    </div>
  )
}
