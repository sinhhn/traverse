import type { VehicleType } from '@/types'
import { Truck } from 'lucide-react'

export interface VehicleTypeBadgeProps {
  type: VehicleType
  count?: number
}

export function VehicleTypeBadge({ type, count }: VehicleTypeBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium">
      <Truck size={14} />
      {type}
      {count !== undefined && <span className="text-neutral-500">×{count}</span>}
    </span>
  )
}
