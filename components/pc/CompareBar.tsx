'use client'

import { useRouter } from 'next/navigation'
import { useCompareStore } from '@/lib/store/compareStore'
import { dummyCompanies } from '@/lib/dummy'
import { ArrowLeftRight } from 'lucide-react'

export function CompareBar() {
  const router = useRouter()
  const { selectedIds, clearCompare } = useCompareStore()

  if (selectedIds.length === 0) return null

  const selectedCompanies = selectedIds
    .map(id => dummyCompanies.find(c => c.id === id))
    .filter(Boolean)

  return (
    <div className="fixed bottom-0 right-0 w-[55%] bg-white/90 backdrop-blur-xl border-t border-neutral-200 px-8 py-5 z-40 flex justify-between items-center shadow-[0_-12px_40px_rgba(140,113,110,0.12)]">
      <div className="flex items-center gap-6">
        <div className="flex -space-x-3">
          {selectedCompanies.map(c => (
            <div
              key={c!.id}
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: c!.logoColor }}
            >
              {c!.nameInitials}
            </div>
          ))}
        </div>
        <div className="text-sm font-bold text-neutral-900">
          <span className="text-[#8B1A1A]">{selectedIds.length}</span> 社を選択中
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={clearCompare}
          className="text-neutral-500 text-xs font-bold uppercase tracking-widest hover:text-[#8B1A1A] transition-colors"
        >
          クリア
        </button>
        <button
          onClick={() => router.push('/pc/compare')}
          className="bg-[#C9A227] text-white px-8 py-3 rounded-sm font-bold text-sm shadow-sm hover:brightness-95 active:scale-95 transition-all flex items-center gap-2"
        >
          <ArrowLeftRight size={18} />
          <span>{selectedIds.length}社を比較する</span>
        </button>
      </div>
    </div>
  )
}
