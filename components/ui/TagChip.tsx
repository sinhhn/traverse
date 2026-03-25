import { X } from 'lucide-react'

export interface TagChipProps {
  label: string
  variant?: 'specialty' | 'filter' | 'condition'
  removable?: boolean
  selected?: boolean
  onRemove?: () => void
  onClick?: () => void
}

export function TagChip({
  label,
  variant = 'specialty',
  removable = false,
  selected = false,
  onRemove,
  onClick,
}: TagChipProps) {
  const variants = {
    specialty: 'bg-burgundy-light text-[#8B1A1A] border border-[#8B1A1A]/10',
    filter: selected
      ? 'bg-[#8B1A1A] text-white border border-[#8B1A1A]'
      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-[#8B1A1A]/40',
    condition: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
  }

  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors ${variants[variant]}`}
      onClick={onClick}
    >
      {label}
      {removable && onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10"
          aria-label={`${label}を削除`}
        >
          <X size={12} />
        </button>
      )}
    </Component>
  )
}
