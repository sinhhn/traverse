import type { Company, AvailableVehicle } from '@/types'
import { Avatar, Badge } from '@/components/ui'

export interface CompanyCardCompactProps {
  company: Company
  vehicle?: AvailableVehicle
}

export function CompanyCardCompact({ company, vehicle }: CompanyCardCompactProps) {
  return (
    <div className="flex-shrink-0 w-[200px] bg-white rounded-xl border border-neutral-200 p-4 shadow-card hover:shadow-panel transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={company.nameInitials} size="sm" color={company.logoColor} />
        <div className="min-w-0">
          <p className="font-bold text-sm text-neutral-900 truncate">{company.name}</p>
          <p className="text-xs text-neutral-500">{company.prefecture}</p>
        </div>
      </div>

      {vehicle && (
        <div className="flex items-center gap-1.5 mb-2">
          <Badge variant="available" label={`${vehicle.type} ${vehicle.temperature}`} size="sm" />
        </div>
      )}

      {company.plan === 'premium' && (
        <Badge variant="premium" label="プレミアム" size="sm" />
      )}
    </div>
  )
}
