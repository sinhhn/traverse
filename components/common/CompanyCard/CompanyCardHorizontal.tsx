import type { Company } from '@/types'
import { Avatar, RatingStars, Badge } from '@/components/ui'
import { MapPin } from 'lucide-react'

export interface CompanyCardHorizontalProps {
  company: Company
}

export function CompanyCardHorizontal({ company }: CompanyCardHorizontalProps) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-4 shadow-card">
      <Avatar initials={company.nameInitials} size="lg" color={company.logoColor} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-base text-neutral-900 truncate">{company.name}</h4>
          {company.plan === 'premium' && <Badge variant="premium" label="プレミアム" size="sm" />}
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-neutral-500">
          <MapPin size={13} />
          <span>{company.prefecture} {company.city}</span>
        </div>
        <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
      </div>
    </div>
  )
}
