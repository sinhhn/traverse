'use client'

import type { Company } from '@/types'
import { MiniRadarChart } from './MiniRadarChart'
import { RatingStars } from '@/components/ui/RatingStars'
import Link from 'next/link'
import { Star, X } from 'lucide-react'
import type { ReactNode } from 'react'

const radarColors = ['#8B1A1A', '#C9A227', '#003450']

export interface ComparisonTableProps {
  companies: Company[]
  onRemove?: (id: string) => void
}

export function ComparisonTable({ companies, onRemove }: ComparisonTableProps) {
  const bestIdx = companies.reduce((best, c, i) =>
    c.rating > companies[best].rating ? i : best, 0
  )

  // Helper: consistent cell style per column
  const colBg = (i: number) => i === bestIdx ? 'bg-[#FEFBEF]' : 'bg-white'
  const colBorder = (i: number) => i === bestIdx ? 'border-l border-r border-[#C9A227]/20' : ''

  // Render a data row
  function Row({ label, values, highlight }: { label: string; values: ReactNode[]; highlight?: number }) {
    return (
      <tr>
        <td className="sticky left-0 bg-white z-20 py-3 px-6 text-sm text-neutral-500 font-medium border-b border-neutral-100">
          {label}
        </td>
        {values.map((val, i) => (
          <td key={i} className={`py-3 px-6 text-sm border-b border-neutral-100 ${colBg(i)} ${colBorder(i)} ${highlight === i ? 'font-bold text-[#8B1A1A]' : 'text-neutral-800'}`}>
            {val}
          </td>
        ))}
      </tr>
    )
  }

  // Render a category divider (label column only, data columns keep their bg)
  function SectionLabel({ label }: { label: string }) {
    return (
      <tr>
        <td className="sticky left-0 bg-white z-20 py-4 px-6 border-b border-neutral-200">
          <span className="text-[11px] font-bold text-[#8B1A1A] tracking-widest uppercase">{label}</span>
        </td>
        {companies.map((c, i) => (
          <td key={c.id} className={`py-4 border-b border-neutral-200 ${colBg(i)} ${colBorder(i)}`} />
        ))}
      </tr>
    )
  }

  // Find best numeric value index
  function findBest(vals: number[], lowerIsBetter = false): number {
    if (vals.length === 0) return -1
    return lowerIsBetter
      ? vals.indexOf(Math.min(...vals))
      : vals.indexOf(Math.max(...vals))
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          {/* ── Header ── */}
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-20 w-[200px] p-6 text-left align-top border-b-2 border-neutral-200" />
              {companies.map((c, i) => (
                <th key={c.id} className={`w-[320px] px-6 pt-5 pb-6 text-left align-top border-b-2 relative ${
                  i === bestIdx
                    ? 'bg-[#FEFBEF] border-[#C9A227]/40 border-l border-r border-[#C9A227]/20'
                    : 'bg-white border-neutral-200'
                }`}>
                  {/* おすすめ tag — inline, not absolute */}
                  {i === bestIdx && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 bg-[#C9A227] text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">
                        <Star size={11} fill="white" />
                        おすすめ
                      </span>
                    </div>
                  )}
                  {/* Spacer for non-best columns to align content */}
                  {i !== bestIdx && <div className="mb-3 h-[26px]" />}

                  {onRemove && (
                    <button
                      onClick={() => onRemove(c.id)}
                      className="absolute top-3 right-4 text-neutral-300 hover:text-red-500 transition-colors"
                      aria-label={`${c.name}を削除`}
                    >
                      <X size={16} />
                    </button>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
                      style={{ backgroundColor: c.logoColor }}
                    >
                      {c.nameInitials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-tight truncate">{c.name}</h3>
                      <RatingStars score={c.rating} reviewCount={c.reviewCount} size="sm" />
                    </div>
                  </div>

                  <Link
                    href={`/pc/company/${c.id}`}
                    className="block w-full border border-[#8B1A1A] text-[#8B1A1A] py-2.5 rounded-lg text-sm font-bold text-center hover:bg-[#8B1A1A] hover:text-white transition-colors"
                  >
                    企業詳細
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {/* 基本情報 */}
            <SectionLabel label="基本情報" />
            <Row label="所在地" values={companies.map(c => `${c.prefecture}${c.city}`)} />
            <Row label="設立" values={companies.map(c => `${c.established}年`)} />
            <Row label="従業員数" values={companies.map(c => c.employeeCount)} />
            <Row label="営業時間" values={companies.map(c => c.operatingHours)} />

            {/* 評価・実績 */}
            <SectionLabel label="評価・実績" />
            <Row label="総合評価" values={companies.map(c => c.rating)} highlight={findBest(companies.map(c => c.rating))} />
            <Row label="レスポンス" values={companies.map(c => `${c.responseTimeHours}h`)} highlight={findBest(companies.map(c => c.responseTimeHours), true)} />
            <Row label="成約率" values={companies.map(c => `${c.successRate}%`)} highlight={findBest(companies.map(c => c.successRate))} />
            <Row label="料金目安" values={companies.map(c => `¥${c.priceRangeMin}〜${c.priceRangeMax}/km`)} />

            {/* 評価チャート */}
            <SectionLabel label="評価チャート" />
            <tr>
              <td className="sticky left-0 bg-white z-20 py-2 px-6 border-b border-neutral-100" />
              {companies.map((c, i) => (
                <td key={c.id} className={`py-2 px-4 border-b border-neutral-100 ${colBg(i)} ${colBorder(i)}`}>
                  <MiniRadarChart breakdown={c.ratingBreakdown} color={radarColors[i % radarColors.length]} />
                </td>
              ))}
            </tr>

            {/* 保有車両 */}
            <SectionLabel label="保有車両" />
            <Row label="車両" values={companies.map(c => (
              <div key={c.id} className="space-y-1">
                {c.vehicles.map(v => (
                  <div key={v.type} className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500">{v.type}</span>
                    <span className="font-medium">{v.count}台</span>
                    {v.hasRefrigeration && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">冷</span>}
                    {v.hasWingBody && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">ウイング</span>}
                  </div>
                ))}
              </div>
            ))} />
            <Row label="温度帯" values={companies.map(c => c.temperatures.join('・'))} />
            <Row label="緊急対応" values={companies.map(c =>
              c.canHandleUrgent
                ? <span key={c.id} className="text-[#2E7D32] font-medium">対応可</span>
                : <span key={c.id} className="text-neutral-400">不可</span>
            )} />

            {/* 得意分野 */}
            <SectionLabel label="得意分野" />
            <Row label="専門" values={companies.map(c => (
              <div key={c.id} className="flex flex-wrap gap-1">
                {c.specialties.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-burgundy-light text-[#8B1A1A] rounded-full text-[11px] font-medium">{s}</span>
                ))}
              </div>
            ))} />

            {/* 対応エリア */}
            <SectionLabel label="対応エリア" />
            <Row label="カバー範囲" values={companies.map(c => (
              <div key={c.id} className="flex flex-wrap gap-1">
                {c.coverageAreas.map(a => (
                  <span key={a} className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] font-medium">{a}</span>
                ))}
              </div>
            ))} />
          </tbody>
        </table>
      </div>
    </div>
  )
}
