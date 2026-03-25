'use client'

import type { Company } from '@/types'

export interface CompanyPinProps {
  company: Company
  isActive: boolean
  onClick: () => void
}

export function CompanyPin({ company, isActive, onClick }: CompanyPinProps) {
  const isPremium = company.plan === 'premium'

  return (
    <button
      onClick={onClick}
      className={`
        rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer
        transition-transform hover:scale-110
        ${isActive ? 'w-12 h-12 ring-4 ring-[#8B1A1A]/20 shadow-2xl z-20' : 'w-8 h-8'}
        ${isPremium ? 'bg-[#8B1A1A] ring-2 ring-[#C9A227]' : 'bg-[#8B1A1A]'}
      `}
      title={company.name}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className={isActive ? 'w-6 h-6' : 'w-4 h-4'}
      >
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    </button>
  )
}
