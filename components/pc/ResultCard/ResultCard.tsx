'use client'

import Link from 'next/link'
import type { Company } from '@/types'
import { useCompareStore } from '@/lib/store/compareStore'
import { RatingStars } from '@/components/ui/RatingStars'
import { Checkbox } from '@/components/ui/Checkbox'
import { AvailabilityBadge } from '@/components/common/AvailabilityBadge'
import { Star } from 'lucide-react'

export interface ResultCardProps {
  company: Company
  matchScore?: number
}

export function ResultCard({ company }: ResultCardProps) {
  const { selectedIds, addToCompare, removeFromCompare } = useCompareStore()
  const isSelected = selectedIds.includes(company.id)
  const isPremium = company.plan === 'premium'
  const isFree = company.plan === 'free'

  const handleCompareToggle = (checked: boolean) => {
    if (checked) {
      addToCompare(company.id)
    } else {
      removeFromCompare(company.id)
    }
  }

  return (
    <div
      className={`
        relative bg-white p-5 flex flex-col transition-all
        hover:shadow-[0_8px_30px_rgba(140,113,110,0.1)]
        ${isPremium
          ? 'border-t-[3px] border-t-[#C9A227] border-l-[3px] border-l-[#8B1A1A] shadow-[0_4px_20px_rgba(140,113,110,0.06)]'
          : isFree
            ? 'border border-neutral-100 opacity-60'
            : 'border border-neutral-200 shadow-[0_4px_20px_rgba(140,113,110,0.04)]'
        }
      `}
    >
      {/* Premium badge */}
      {isPremium && (
        <div className="absolute top-0 right-0 bg-[#C9A227] text-white text-[10px] font-black px-3 py-1 rounded-bl-sm flex items-center gap-1">
          <Star size={10} fill="white" />
          <span>プレミアム</span>
        </div>
      )}

      <div className="flex gap-6">
        {/* Logo placeholder */}
        <div className="w-[72px] h-[72px] shrink-0 bg-neutral-50 rounded-sm overflow-hidden flex items-center justify-center border border-neutral-200/50">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: company.logoColor }}
          >
            {company.nameInitials}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base font-bold text-neutral-900 leading-tight">
                {company.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {company.specialties.slice(0, 3).map(s => (
                  <span key={s} className="bg-neutral-50 text-neutral-500 text-[10px] px-2 py-0.5 font-bold rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0 ml-4">
              {!isFree && (
                <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
              )}
              <div className="mt-2">
                {company.currentlyAvailable ? (
                  <AvailabilityBadge count={company.availableVehicleCount} />
                ) : isFree ? (
                  <span className="inline-block bg-neutral-100 text-neutral-500 border border-neutral-200 text-[10px] px-2 py-0.5 font-bold rounded-full">
                    空き車両情報なし
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-600 font-medium mb-4">
            <span className="text-neutral-400">保有車両:</span>{' '}
            {company.vehicles.map(v => `${v.type}×${v.count}台`).join(' / ')}
          </p>

          <div className="flex justify-between items-center pt-2">
            <Checkbox
              checked={isSelected}
              onChange={handleCompareToggle}
              label="比較リストに追加"
            />
            <div className="flex gap-3">
              <Link
                href={`/company/${company.id}`}
                className={`text-xs font-bold px-4 py-2 transition-colors ${
                  isFree ? 'text-neutral-400' : 'text-[#8B1A1A] hover:bg-[#8B1A1A]/5'
                }`}
              >
                詳細を見る
              </Link>
              <button
                className={`text-xs font-bold px-6 py-2 rounded-sm transition-all ${
                  isFree
                    ? 'bg-neutral-200 text-white cursor-not-allowed'
                    : 'bg-[#8B1A1A] text-white shadow-sm active:scale-95'
                }`}
                disabled={isFree}
              >
                見積依頼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
