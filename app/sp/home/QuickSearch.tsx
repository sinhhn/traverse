'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

const quickTags = [
  { label: '冷凍車', query: 'category=冷凍・冷蔵' },
  { label: '当日対応', query: 'urgent=true' },
  { label: '求人あり', query: 'category=求人' },
]

export function QuickSearch() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  function handleSearch() {
    if (keyword.trim()) {
      router.push(`/sp/results?keyword=${encodeURIComponent(keyword.trim())}`)
    } else {
      router.push('/sp/wizard/step1')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="mx-4 -mt-10 relative z-10">
      <div className="bg-white rounded-xl p-5 shadow-panel">
        <h2 className="text-lg font-bold mb-4">運送会社をさがす</h2>

        {/* Search input — now interactive */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            className="w-full h-12 pl-10 pr-12 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-[#8B1A1A] focus:ring-1 focus:ring-[#8B1A1A]/30 transition-colors"
            placeholder="エリアまたは会社名で検索..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8B1A1A] rounded-lg flex items-center justify-center"
          >
            <ArrowRight size={14} className="text-white" />
          </button>
        </div>

        {/* Quick tags — tap to go to results */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickTags.map(tag => (
            <button
              key={tag.label}
              onClick={() => router.push(`/sp/results?${tag.query}`)}
              className="px-3 py-1.5 bg-[#8B1A1A]/5 text-[#8B1A1A] rounded-full text-xs font-medium border border-[#8B1A1A]/10 active:bg-[#8B1A1A]/20 transition-colors"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Detailed search link */}
        <Link href="/sp/wizard/step1">
          <Button variant="primary" size="lg" className="w-full">
            詳しい条件で探す <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </section>
  )
}
