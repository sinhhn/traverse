'use client'

import type { Company, Review, Job, AvailableVehicle } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NavbarSP } from '@/components/common/Navbar'
import { Avatar, Badge, RatingStars, TagChip } from '@/components/ui'
import { StickyQuoteButton } from '@/components/sp/StickyQuoteButton'
import { MapPin, Clock, Star, Truck, Briefcase } from 'lucide-react'
import { formatSalary } from '@/lib/utils/formatters'

interface CompanyDetailSPProps {
  company: Company
  reviews: Review[]
  jobs: Job[]
  vehicles: AvailableVehicle[]
}

type TabId = 'info' | 'vehicles' | 'reviews' | 'jobs'

export function CompanyDetailSP({ company, reviews, jobs, vehicles }: CompanyDetailSPProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('info')

  const tabs: { id: TabId; label: string; icon: typeof MapPin }[] = [
    { id: 'info', label: '会社情報', icon: MapPin },
    { id: 'vehicles', label: '空き車両', icon: Truck },
    { id: 'reviews', label: 'レビュー', icon: Star },
    { id: 'jobs', label: '求人', icon: Briefcase },
  ]

  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto pb-24">
      <NavbarSP title={company.name} showBack />
      <main className="pt-14">
        {/* Header */}
        <div className="px-5 py-6 bg-white border-b border-neutral-200">
          <div className="flex items-start gap-4">
            <Avatar initials={company.nameInitials} size="lg" color={company.logoColor} />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-lg">{company.name}</h1>
                {company.plan === 'premium' && <Badge variant="premium" label="プレミアム" size="sm" />}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-neutral-500">
                <MapPin size={13} /> {company.address}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <RatingStars score={company.rating} reviewCount={company.reviewCount} size="sm" />
                <span className="text-xs text-neutral-400"><Clock size={12} className="inline" /> 返信 {company.responseTimeHours}h</span>
              </div>
              {company.currentlyAvailable && (
                <div className="mt-2">
                  <Badge variant="available" label={`空き${company.availableVehicleCount}台`} size="sm" />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-4">{company.prText}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {company.specialties.map(s => <TagChip key={s} label={s} variant="specialty" />)}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 bg-white sticky top-14 z-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                activeTab === tab.id
                  ? 'text-[#8B1A1A] border-b-2 border-[#8B1A1A]'
                  : 'text-neutral-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-5 py-5">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <InfoRow label="設立" value={`${company.established}年`} />
              <InfoRow label="従業員数" value={company.employeeCount} />
              <InfoRow label="資本金" value={company.capital} />
              <InfoRow label="許可番号" value={company.licenseNumber} />
              <InfoRow label="主要取引先" value={company.mainClients} />
              <InfoRow label="営業時間" value={company.operatingHours} />
              <InfoRow label="対応エリア" value={company.coverageAreas.join('、')} />
              <InfoRow label="対応温度帯" value={company.temperatures.join('、')} />
              <InfoRow label="料金目安" value={`¥${company.priceRangeMin}〜${company.priceRangeMax}/km`} />
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="space-y-3">
              {vehicles.length > 0 ? vehicles.map(v => (
                <div key={v.id} className="bg-white rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="available" label={`${v.type} ${v.temperature}`} />
                    {v.canHandleUrgent && <Badge variant="urgent" label="緊急OK" size="sm" />}
                  </div>
                  <p className="text-sm text-neutral-600">{v.departureArea} → {v.destinationAreas.join('、')}</p>
                  <p className="text-xs text-neutral-400 mt-1">{v.availableFrom} 〜 {v.availableTo}</p>
                </div>
              )) : <p className="text-neutral-500 text-sm">現在空き車両はありません</p>}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="bg-white rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar initials={r.authorInitials} size="sm" color="#888780" />
                    <RatingStars score={r.rating} size="sm" />
                    <span className="text-xs text-neutral-400">{r.postedAt}</span>
                  </div>
                  <p className="text-sm text-neutral-700">{r.text}</p>
                  {r.highlightTags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {r.highlightTags.map(tag => <TagChip key={tag} label={tag} variant="specialty" />)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-3">
              {jobs.length > 0 ? jobs.map(j => (
                <div key={j.id} className="bg-white rounded-xl border border-neutral-200 p-4">
                  <h4 className="font-bold text-sm">{j.title}</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    {formatSalary(j.salaryMin, j.salaryMax, j.salaryType)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                    <Badge variant="hiring" label={j.employmentType} size="sm" />
                    <span>{j.location}</span>
                  </div>
                </div>
              )) : <p className="text-neutral-500 text-sm">現在募集中の求人はありません</p>}
            </div>
          )}
        </div>
      </main>

      <StickyQuoteButton
        companyName={company.name}
        onClick={() => router.push(`/sp/quote?company=${company.id}`)}
      />
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-500 w-24 shrink-0">{label}</span>
      <span className="text-sm text-neutral-800">{value}</span>
    </div>
  )
}
