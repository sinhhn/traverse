'use client'

import { useMemo } from 'react'
import { MapContainer } from '@/components/pc/MapContainer'
import { FilterChips } from '@/components/pc/FilterChips'
import { ResultCard } from '@/components/pc/ResultCard'
import { CompareBar } from '@/components/pc/CompareBar'
import { useSearchStore } from '@/lib/store/searchStore'
import { searchCompanies } from '@/lib/dummy'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Prefecture center coordinates for map zoom
const prefectureCenters: Record<string, { lat: number; lng: number }> = {
  '北海道': { lat: 43.06, lng: 141.35 },
  '東京都': { lat: 35.68, lng: 139.77 },
  '神奈川県': { lat: 35.45, lng: 139.64 },
  '埼玉県': { lat: 35.86, lng: 139.65 },
  '千葉県': { lat: 35.61, lng: 140.12 },
  '愛知県': { lat: 35.18, lng: 136.91 },
  '大阪府': { lat: 34.69, lng: 135.50 },
  '兵庫県': { lat: 34.69, lng: 135.18 },
  '京都府': { lat: 35.01, lng: 135.77 },
  '福岡県': { lat: 33.59, lng: 130.40 },
  '宮城県': { lat: 38.27, lng: 140.87 },
  '広島県': { lat: 34.40, lng: 132.46 },
  '長野県': { lat: 36.23, lng: 137.97 },
  '香川県': { lat: 34.34, lng: 134.04 },
  '沖縄県': { lat: 26.34, lng: 127.76 },
}

export default function SearchResultsPage() {
  const {
    prefecture, vehicleType, temperature, urgentOnly,
    minVehicleCount, targetCustomer, availableHours,
    activePin, setActivePin,
  } = useSearchStore()

  const results = useMemo(() => {
    const filtered = searchCompanies({
      prefecture: prefecture ?? undefined,
      vehicleType: vehicleType ?? undefined,
      temperature: temperature ?? undefined,
      urgentOnly,
      minVehicleCount: minVehicleCount ?? undefined,
      targetCustomer: targetCustomer ?? undefined,
      availableHours: availableHours ?? undefined,
    })

    // Sort: premium+available first, then standard, then free (with opacity)
    return filtered.sort((a, b) => {
      const planOrder = { premium: 0, standard: 1, free: 2 }
      const aOrder = planOrder[a.plan]
      const bOrder = planOrder[b.plan]
      if (aOrder !== bOrder) return aOrder - bOrder

      // Within same plan, available first
      if (a.currentlyAvailable !== b.currentlyAvailable) {
        return a.currentlyAvailable ? -1 : 1
      }

      // Then by rating
      return b.rating - a.rating
    })
  }, [prefecture, vehicleType, temperature, urgentOnly, minVehicleCount, targetCustomer, availableHours])

  return (
    <main className="pt-[60px] h-screen flex flex-col">
      {/* Breadcrumbs */}
      <div className="bg-neutral-100 px-8 py-3 border-b border-neutral-200/30 shrink-0">
        <nav className="flex text-[11px] tracking-wider font-medium text-neutral-500 uppercase items-center gap-2">
          <Link href="/" className="hover:text-[#8B1A1A] transition-colors">ホーム</Link>
          <ChevronRight size={12} />
          {prefecture && (
            <>
              <span>{prefecture}</span>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-neutral-900">
            {vehicleType ? `${vehicleType}` : ''}
            {temperature ? `${temperature}` : ''}
            {!vehicleType && !temperature ? '検索結果' : ''}
          </span>
        </nav>
      </div>

      {/* Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT 45%: Map Panel */}
        <section className="w-[45%] relative border-r border-neutral-200/30">
          <MapContainer
            companies={results}
            activePin={activePin}
            onPinClick={setActivePin}
            onPinClose={() => setActivePin(null)}
            center={prefecture ? prefectureCenters[prefecture] : undefined}
            zoom={prefecture ? 10 : undefined}
          />

          {/* Filter chips overlay on map */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <FilterChips />
          </div>
        </section>

        {/* RIGHT 55%: List Panel */}
        <section className="w-[55%] bg-neutral-50 flex flex-col">
          {/* Sort Bar */}
          <div className="px-8 py-4 bg-white border-b border-neutral-200/30 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">{results.length}</span>
              <span className="text-sm text-neutral-500 font-medium">件の運送会社</span>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 text-xs font-bold text-neutral-900 border border-neutral-200 px-3 py-2 rounded-sm hover:bg-neutral-50 transition-colors">
                <span>おすすめ順</span>
                <ChevronRight size={14} className="rotate-90" />
              </button>
            </div>
          </div>

          {/* Results scroll area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
            {results.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">
                <p className="text-lg font-bold mb-2">検索結果がありません</p>
                <p className="text-sm">条件を変更して再検索してください</p>
              </div>
            ) : (
              results.map(company => (
                <ResultCard key={company.id} company={company} />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Compare Bar */}
      <CompareBar />
    </main>
  )
}
