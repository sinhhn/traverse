'use client'

import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/lib/store/searchStore'
import { PrefectureSelect } from './PrefectureSelect'
import { Toggle } from '@/components/ui/Toggle'
import type { VehicleType, Temperature } from '@/types'
import { Search, ArrowRight } from 'lucide-react'

const vehicleTypes: VehicleType[] = ['軽貨物', '2t', '4t', '10t']
const temperatures: Temperature[] = ['常温', '冷蔵', '冷凍']

export function SearchPanel() {
  const router = useRouter()
  const {
    prefecture, vehicleType, temperature, urgentOnly,
    minVehicleCount, targetCustomer, availableHours,
    setPrefecture, setVehicleType, setTemperature, setUrgentOnly,
    setMinVehicleCount, setTargetCustomer, setAvailableHours,
  } = useSearchStore()

  const handleSearch = () => {
    router.push('/pc/search')
  }

  // Compact chip button
  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-[11px] rounded-full transition-colors ${
        active
          ? 'bg-[#8B1A1A] text-white font-bold'
          : 'border border-neutral-200 text-neutral-600 hover:border-[#8B1A1A]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="w-[340px] bg-white/95 backdrop-blur-sm p-5 shadow-[0_12px_40px_rgba(140,113,110,0.15)] border-t-2 border-[#8B1A1A]">
      <h2 className="text-base font-bold mb-4 tracking-tight flex items-center gap-2">
        <Search size={16} className="text-[#8B1A1A]" />
        運送会社を検索
      </h2>

      <div className="space-y-3">
        {/* Row 1: Prefecture */}
        <div>
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">対応エリア</label>
          <PrefectureSelect value={prefecture} onChange={setPrefecture} />
        </div>

        {/* Row 2: Vehicle Type + Count on same row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">車両タイプ</label>
            <div className="flex flex-wrap gap-1">
              {vehicleTypes.map(vt => (
                <Chip key={vt} label={vt} active={vehicleType === vt} onClick={() => setVehicleType(vehicleType === vt ? null : vt)} />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">台数</label>
            <select
              value={minVehicleCount ?? ''}
              onChange={e => setMinVehicleCount(e.target.value ? Number(e.target.value) : null)}
              className="w-full text-xs border border-neutral-200 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-[#8B1A1A]"
            >
              <option value="">指定なし</option>
              <option value="5">5台以上</option>
              <option value="10">10台以上</option>
              <option value="20">20台以上</option>
            </select>
          </div>
        </div>

        {/* Row 3: Temperature (segmented) */}
        <div>
          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">温度帯</label>
          <div className="grid grid-cols-3 bg-neutral-50 p-0.5 rounded-sm">
            {temperatures.map(t => (
              <button
                key={t}
                onClick={() => setTemperature(temperature === t ? null : t)}
                className={`py-1.5 text-[11px] font-medium rounded-sm transition-all ${
                  temperature === t ? 'bg-white shadow-sm text-[#8B1A1A] font-bold' : 'text-neutral-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Target Customer + Hours on same row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">対象</label>
            <div className="flex gap-1">
              {([null, 'B2B', 'B2C'] as const).map(v => (
                <Chip
                  key={v ?? 'all'}
                  label={v === null ? '全て' : v === 'B2B' ? '法人' : '個人'}
                  active={targetCustomer === v}
                  onClick={() => setTargetCustomer(targetCustomer === v ? null : v)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">対応時間</label>
            <div className="flex gap-1">
              {([null, '24h', 'weekend'] as const).map(v => (
                <Chip
                  key={v ?? 'any'}
                  label={v === null ? '全て' : v === '24h' ? '24h' : '土日'}
                  active={availableHours === v}
                  onClick={() => setAvailableHours(availableHours === v ? null : v)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 5: Urgent + Search button */}
        <div className="flex items-center gap-3 pt-1">
          <Toggle checked={urgentOnly} onChange={setUrgentOnly} label="緊急のみ" />
          <button
            onClick={handleSearch}
            className="flex-1 bg-[#8B1A1A] text-white py-2.5 text-sm font-bold rounded-sm hover:opacity-90 transition-all flex items-center justify-center gap-1"
          >
            検索 <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
