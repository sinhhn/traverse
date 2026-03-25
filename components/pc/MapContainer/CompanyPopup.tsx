'use client'

import Link from 'next/link'
import type { Company } from '@/types'
import { RatingStars } from '@/components/ui'
import { PremiumBadge } from '@/components/common/PremiumBadge'
import { AvailabilityBadge } from '@/components/common/AvailabilityBadge'

export interface CompanyPopupProps {
  company: Company
  onClose: () => void
}

export function CompanyPopup({ company, onClose }: CompanyPopupProps) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white p-4 shadow-xl rounded-sm border-l-4 border-[#8B1A1A] z-30">
      <div className="flex justify-between items-start mb-2">
        {company.plan === 'premium' ? (
          <PremiumBadge />
        ) : (
          <span className="text-xs font-bold text-neutral-500 tracking-widest uppercase">
            {company.plan}
          </span>
        )}
        {company.currentlyAvailable && (
          <AvailabilityBadge count={company.availableVehicleCount} />
        )}
      </div>
      <h4 className="font-bold text-sm mb-1">{company.name}</h4>
      <div className="mb-2">
        <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {company.specialties.slice(0, 3).map(s => (
          <span key={s} className="bg-neutral-100 text-neutral-600 text-[10px] px-2 py-0.5 font-bold rounded-sm">
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          {company.vehicles.reduce((s, v) => s + v.count, 0)} 台
        </span>
        <Link
          href={`/company/${company.id}`}
          className="text-[#8B1A1A] font-bold hover:underline"
        >
          詳細を見る
        </Link>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600"
        aria-label="閉じる"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
}
