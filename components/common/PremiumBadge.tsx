import { Crown } from 'lucide-react'

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF3D0] text-[#7A5800] text-sm font-bold border border-[#C9A227]/30">
      <Crown size={14} />
      プレミアム
    </span>
  )
}
