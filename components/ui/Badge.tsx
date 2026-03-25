export interface BadgeProps {
  variant: 'premium' | 'available' | 'urgent' | 'hiring'
  label: string
  size?: 'sm' | 'md'
}

export function Badge({ variant, label, size = 'md' }: BadgeProps) {
  const variants = {
    premium: 'bg-[#FDF3D0] text-[#7A5800] border border-[#C9A227]/30',
    available: 'bg-[#E8F5E9] text-[#2E7D32] border border-[#81C784]/30',
    urgent: 'bg-[#FFF3E0] text-[#E65100] border border-[#E65100]/20',
    hiring: 'bg-[#EDE7F6] text-[#4527A0] border border-[#4527A0]/20',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {label}
    </span>
  )
}
