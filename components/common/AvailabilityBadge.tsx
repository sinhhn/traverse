import { CircleCheck } from 'lucide-react'

export interface AvailabilityBadgeProps {
  count: number
  timeLabel?: string
}

export function AvailabilityBadge({ count, timeLabel }: AvailabilityBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium border border-[#81C784]/30">
      <CircleCheck size={14} />
      {timeLabel ? `${timeLabel} 空き${count}台` : `空き車${count}台`}
    </span>
  )
}
