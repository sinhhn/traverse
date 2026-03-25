import type { Company } from '@/types'
import { Avatar, Badge, TagChip, RatingStars } from '@/components/ui'
import { MapPin, Clock, Truck } from 'lucide-react'

export interface CompanyCardProps {
  company: Company
  showMatchScore?: boolean
  matchScore?: number
  onRequestQuote?: (companyId: string) => void
  onAddToCompare?: (companyId: string) => void
}

export function CompanyCard({
  company,
  showMatchScore = false,
  matchScore,
}: CompanyCardProps) {
  return (
    <div className={`bg-white rounded-xl border p-5 shadow-card transition-shadow hover:shadow-panel ${
      company.plan === 'premium' ? 'border-[#C9A227]/30 ring-1 ring-[#C9A227]/20' : 'border-neutral-200'
    }`}>
      <div className="flex items-start gap-4">
        <Avatar initials={company.nameInitials} size="lg" color={company.logoColor} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-md text-neutral-900 truncate">{company.name}</h3>
            {company.plan === 'premium' && <Badge variant="premium" label="プレミアム" size="sm" />}
            {company.currentlyAvailable && <Badge variant="available" label={`空き${company.availableVehicleCount}台`} size="sm" />}
          </div>

          <div className="flex items-center gap-3 mt-1.5 text-sm text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} />
              {company.prefecture} {company.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              {company.operatingHours}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
            <span className="text-xs text-neutral-400">返信 {company.responseTimeHours}h</span>
          </div>

          {showMatchScore && matchScore !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#8B1A1A] rounded-full" style={{ width: `${matchScore}%` }} />
              </div>
              <span className="text-sm font-bold text-[#8B1A1A]">{matchScore}%</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {company.specialties.slice(0, 3).map(tag => (
              <TagChip key={tag} label={tag} variant="specialty" />
            ))}
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
            <Truck size={13} />
            {company.vehicles.map(v => `${v.type}×${v.count}`).join('、')}
          </div>
        </div>
      </div>
    </div>
  )
}
