import { Star } from 'lucide-react'

export interface RatingStarsProps {
  score: number
  reviewCount?: number
  size?: 'sm' | 'md'
}

export function RatingStars({ score, reviewCount, size = 'md' }: RatingStarsProps) {
  const sizes = {
    sm: { star: 12, text: 'text-xs' },
    md: { star: 16, text: 'text-sm' },
  }

  const s = sizes[size]

  return (
    <div className="inline-flex items-center gap-1">
      <Star size={s.star} className="fill-[#C9A227] text-[#C9A227]" />
      <span className={`font-semibold text-neutral-900 ${s.text}`}>
        {score.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={`text-neutral-500 ${s.text}`}>
          ({reviewCount}件)
        </span>
      )}
    </div>
  )
}
