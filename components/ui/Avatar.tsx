export interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Avatar({
  initials,
  size = 'md',
  color = '#1A3A5C',
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-md',
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white font-bold ${sizes[size]}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}
