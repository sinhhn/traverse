'use client'

import { Input, Textarea } from '@/components/ui'
import { Package } from 'lucide-react'

export interface CargoSectionProps {
  cargoContent: string
  weight: string
  onCargoContentChange: (v: string) => void
  onWeightChange: (v: string) => void
  errors?: Record<string, string>
}

export function CargoSection({ cargoContent, weight, onCargoContentChange, onWeightChange, errors }: CargoSectionProps) {
  return (
    <section>
      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
        <Package size={18} className="text-[#8B1A1A]" />
        荷物の情報
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">荷物の内容 *</label>
          <Textarea
            placeholder="例: 冷凍食品（段ボール20箱）"
            value={cargoContent}
            onChange={e => onCargoContentChange(e.target.value)}
            error={errors?.cargoContent}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">重量 (kg) *</label>
          <Input
            type="number"
            placeholder="例: 500"
            value={weight}
            onChange={e => onWeightChange(e.target.value)}
            error={errors?.weight}
          />
        </div>
      </div>
    </section>
  )
}
