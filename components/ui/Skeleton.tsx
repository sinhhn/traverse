export interface SkeletonProps {
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
}

export function Skeleton({
  width,
  height = '1rem',
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={`animate-pulse bg-neutral-200 ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  )
}
