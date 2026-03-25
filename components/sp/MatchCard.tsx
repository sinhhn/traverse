'use client'

import type { Company, MatchCardVariant } from '@/types'
import { Avatar, Badge, RatingStars, TagChip } from '@/components/ui'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export interface MatchCardProps {
  company: Company
  matchScore: number
  variant: MatchCardVariant
}

export function MatchCard({ company, matchScore, variant }: MatchCardProps) {
  const borderStyles = {
    recommended: 'border-[#C9A227]/40 ring-1 ring-[#C9A227]/20',
    available: 'border-[#81C784]/40',
    hiring: 'border-[#4527A0]/20',
    standard: 'border-neutral-200',
    unavailable: 'border-neutral-200 opacity-60',
  }

  return (
    <div className={`bg-white rounded-xl border p-4 shadow-card ${borderStyles[variant]}`}>
      {variant === 'recommended' && (
        <div className="flex items-center gap-1 mb-3 text-xs font-bold text-[#7A5800]">
          <span>⭐</span> おすすめ
        </div>
      )}

      <div className="flex items-start gap-3">
        <Avatar initials={company.nameInitials} size="md" color={company.logoColor} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-base text-neutral-900 truncate">{company.name}</h3>
            {company.plan === 'premium' && <Badge variant="premium" label="プレミアム" size="sm" />}
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
            <MapPin size={12} />
            <span>{company.prefecture} {company.city}</span>
            <Clock size={12} />
            <span>返信{company.responseTimeHours}h</span>
          </div>

          <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
        </div>
      </div>

      {/* Match Score Bar */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B1A1A] rounded-full transition-all"
            style={{ width: `${matchScore}%` }}
          />
        </div>
        <span className="text-sm font-bold text-[#8B1A1A] min-w-[40px] text-right">{matchScore}%</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {company.specialties.slice(0, 3).map(tag => (
          <TagChip key={tag} label={tag} variant="specialty" />
        ))}
      </div>

      {company.currentlyAvailable && (
        <Badge variant="available" label={`空き${company.availableVehicleCount}台`} size="sm" />
      )}

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-neutral-500">
          ¥{company.priceRangeMin}〜{company.priceRangeMax}/km
        </span>
        <Link
          href={`/sp/company/${company.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-[#8B1A1A]"
        >
          詳細を見る <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
