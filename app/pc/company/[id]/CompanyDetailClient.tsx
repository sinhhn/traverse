'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Company, Review, Job, AvailableVehicle } from '@/types'
import { useCompareStore } from '@/lib/store/compareStore'
import { RatingStars } from '@/components/ui/RatingStars'
import { PremiumBadge } from '@/components/common/PremiumBadge'
import { Star, MapPin, Briefcase } from 'lucide-react'

type TabKey = 'info' | 'vehicles' | 'reviews' | 'jobs'

interface Props {
  company: Company
  reviews: Review[]
  jobs: Job[]
  vehicles: AvailableVehicle[]
}

export function CompanyDetailClient({ company, reviews, jobs, vehicles }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('info')
  const { addToCompare, selectedIds } = useCompareStore()
  const isInCompare = selectedIds.includes(company.id)

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'info', label: '会社情報' },
    { key: 'vehicles', label: '空き車両' },
    { key: 'reviews', label: 'レビュー' },
    { key: 'jobs', label: '求人' },
  ]

  return (
    <main className="pt-[60px]">
      {/* Hero Header Band */}
      <div className="bg-white h-[160px] w-full border-b border-neutral-200 flex items-center px-12 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6 flex-1">
          <div
            className="w-[80px] h-[80px] rounded-sm flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: company.logoColor }}
          >
            {company.nameInitials}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-heading tracking-tight">{company.name}</h1>
              {company.plan === 'premium' && <PremiumBadge />}
            </div>
            <p className="text-neutral-500 text-sm mt-1">
              {company.prefecture}{company.city} / 設立{company.established}年
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center px-12 border-x border-neutral-200 h-full justify-center">
          <div className="flex items-center gap-1">
            <Star size={20} className="fill-gold text-gold" />
            <span className="text-3xl font-bold font-heading">{company.rating}</span>
          </div>
          <p className="text-neutral-500 text-sm underline cursor-pointer">
            {company.reviewCount}件のレビュー
          </p>
        </div>

        <div className="flex items-center gap-4 pl-12">
          <button className="bg-[#8B1A1A] text-white px-8 py-3 rounded-sm font-bold text-lg hover:opacity-95 transition-all">
            見積依頼をする
          </button>
          <button
            onClick={() => addToCompare(company.id)}
            disabled={isInCompare}
            className="border border-neutral-400 text-[#8B1A1A] px-6 py-3 rounded-sm font-bold hover:bg-neutral-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInCompare ? '比較リストに追加済み' : '比較リストに追加'}
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1440px] mx-auto px-12 py-10 grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-12">
          {/* Photo Gallery Placeholder */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">
                写真・ギャラリー
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 h-[240px]">
              {[0, 1, 2].map(i => (
                <div key={i} className="bg-neutral-100 rounded-sm overflow-hidden">
                  {company.photos[i] ? (
                    <img src={company.photos[i]} alt={`${company.name} 写真${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-neutral-300">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tab Bar */}
          <div className="border-b border-neutral-200 flex gap-10">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 border-b-2 transition-colors font-medium ${
                  activeTab === tab.key
                    ? 'border-[#8B1A1A] text-[#8B1A1A] font-bold'
                    : 'border-transparent text-neutral-500 hover:text-[#8B1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <>
              {/* Company Info */}
              <section className="space-y-6">
                <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">会社情報</h2>
                <div className="grid grid-cols-2 gap-y-6 gap-x-12 bg-white p-8 shadow-card rounded-sm">
                  {[
                    ['保有車両台数', company.vehicles.reduce((s, v) => s + v.count, 0) + '台'],
                    ['対応エリア', company.coverageAreas.join('・')],
                    ['営業時間', company.operatingHours],
                    ['資本金', company.capital],
                    ['従業員数', company.employeeCount],
                    ['許認可番号', company.licenseNumber],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-neutral-100 pb-3">
                      <span className="text-neutral-500 text-sm">{label}</span>
                      <span className="font-bold text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Expertise Tags */}
              <section className="space-y-4">
                <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">得意分野タグ</h2>
                <div className="flex flex-wrap gap-3">
                  {company.specialties.map(s => (
                    <span key={s} className="bg-burgundy-50 text-[#8B1A1A] px-4 py-1.5 rounded-full text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'vehicles' && (
            <section className="space-y-4">
              <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">空き車両 (リアルタイム)</h2>
              <div className="bg-white shadow-card rounded-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-neutral-50 text-neutral-500 text-sm font-medium uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">車両タイプ</th>
                      <th className="px-6 py-4">稼働可能時間</th>
                      <th className="px-6 py-4">現在エリア</th>
                      <th className="px-6 py-4 text-right">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {vehicles.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-neutral-400">
                          現在空き車両はありません
                        </td>
                      </tr>
                    ) : (
                      vehicles.map(v => (
                        <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <span className="font-bold">{v.type} {v.temperature !== '常温' ? v.temperature : ''}</span>
                            {v.canHandleUrgent && (
                              <span className="bg-available-bg text-available-text px-2 py-0.5 rounded text-[10px] font-bold">
                                緊急対応可
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-5 text-sm">
                            {new Date(v.availableFrom).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })} 〜
                          </td>
                          <td className="px-6 py-5 text-sm">{v.departureArea}</td>
                          <td className="px-6 py-5 text-right">
                            <button className="bg-[#8B1A1A] text-white px-4 py-1.5 text-sm rounded-sm font-medium hover:opacity-90">
                              予約/相談
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'reviews' && (
            <section className="space-y-6">
              <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">レビュー</h2>

              {/* Rating summary */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="col-span-1 bg-neutral-100 p-6 rounded-sm flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold font-heading mb-2 text-[#8B1A1A]">{company.rating}</span>
                  <RatingStars score={company.rating} />
                  <span className="text-xs text-neutral-500 mt-2">{company.reviewCount}件の総合評価</span>
                </div>
                <div className="col-span-2 space-y-2 py-2">
                  {[
                    { label: '配送品質', value: company.ratingBreakdown.deliveryQuality },
                    { label: '対応スピード', value: company.ratingBreakdown.responseSpeed },
                    { label: '価格妥当性', value: company.ratingBreakdown.priceValue },
                    { label: 'コミュニケーション', value: company.ratingBreakdown.communication },
                    { label: '総合満足度', value: company.ratingBreakdown.overall },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="text-xs w-28 text-neutral-500">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="bg-gold h-full rounded-full" style={{ width: `${(item.value / 5) * 100}%` }} />
                      </div>
                      <span className="text-xs text-neutral-600 font-medium w-8">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews list */}
              <div className="space-y-6">
                {reviews.map((review, i) => (
                  <div
                    key={review.id}
                    className={`bg-white p-6 rounded-sm shadow-card space-y-3 ${
                      i === 0 ? 'border-l-4 border-gold' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-sm font-bold text-neutral-500">
                          {review.authorInitials}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{review.authorInitials}</div>
                          <RatingStars score={review.rating} size="sm" />
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500">{review.postedAt}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-800">{review.text}</p>
                    {review.highlightTags && (
                      <div className="flex gap-2">
                        {review.highlightTags.map(tag => (
                          <span key={tag} className="text-[10px] bg-burgundy-50 text-[#8B1A1A] px-2 py-0.5 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'jobs' && (
            <section className="space-y-6">
              <h2 className="border-l-[3px] border-[#8B1A1A] pl-4 text-lg font-bold font-heading">求人情報</h2>
              {jobs.length === 0 ? (
                <p className="text-neutral-400 text-center py-10">現在募集中の求人はありません</p>
              ) : (
                <div className="space-y-6">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-white p-6 shadow-card rounded-sm space-y-2 group cursor-pointer">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          job.employmentType === '正社員'
                            ? 'bg-gold-light text-gold-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {job.employmentType}
                        </span>
                        <span className="text-[#8B1A1A] font-bold text-sm">
                          {job.salaryType} {job.salaryMin.toLocaleString()}円〜{job.salaryMax.toLocaleString()}円
                        </span>
                      </div>
                      <h4 className="font-bold text-sm group-hover:text-[#8B1A1A] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={12} />
                          {job.requiredLicense}
                        </span>
                      </div>
                      <a href="#" className="text-[#8B1A1A] text-xs font-bold underline inline-block pt-1">
                        応募する
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <aside className="col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Quote Card */}
            <div className="bg-white p-8 shadow-card rounded-sm border-t-4 border-[#8B1A1A]">
              <h3 className="text-xl font-bold font-heading mb-6">見積依頼</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500">発地</label>
                  <input
                    className="w-full bg-neutral-50 border-none focus:ring-0 text-sm py-3 px-4 rounded-sm border-b-2 border-transparent focus:border-[#8B1A1A] transition-all"
                    placeholder="市区町村名を入力"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500">着地</label>
                  <input
                    className="w-full bg-neutral-50 border-none focus:ring-0 text-sm py-3 px-4 rounded-sm border-b-2 border-transparent focus:border-[#8B1A1A] transition-all"
                    placeholder="市区町村名を入力"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500">希望車両</label>
                  <select className="w-full bg-neutral-50 border-none focus:ring-0 text-sm py-3 px-4 rounded-sm border-b-2 border-transparent focus:border-[#8B1A1A] transition-all">
                    {company.vehicles.map(v => (
                      <option key={v.type}>{v.type}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8B1A1A] text-white py-4 font-bold rounded-sm mt-4 hover:opacity-95 shadow-lg"
                >
                  無料で見積依頼
                </button>
              </form>
              <p className="text-[10px] text-center text-neutral-500 mt-4">
                最短5分で担当者よりご連絡いたします
              </p>
            </div>

            {/* Job Listings mini-card */}
            {jobs.length > 0 && (
              <div className="bg-white p-6 shadow-card rounded-sm">
                <h3 className="text-lg font-bold font-heading mb-6 flex justify-between items-center">
                  求人情報
                  <Briefcase size={20} className="text-[#8B1A1A]" />
                </h3>
                <div className="space-y-6">
                  {jobs.slice(0, 2).map(job => (
                    <div key={job.id} className="space-y-2 group cursor-pointer">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          job.employmentType === '正社員'
                            ? 'bg-gold-light text-gold-800'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {job.employmentType}
                        </span>
                        <span className="text-[#8B1A1A] font-bold text-sm">
                          {job.salaryType} {job.salaryMin.toLocaleString()}円〜
                        </span>
                      </div>
                      <h4 className="font-bold text-sm group-hover:text-[#8B1A1A] transition-colors">
                        {job.title}
                      </h4>
                      <a href="#" className="text-[#8B1A1A] text-xs font-bold underline inline-block pt-1">
                        応募する
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company PR Card */}
            <div className="bg-neutral-100 p-6 rounded-sm">
              <h3 className="text-sm font-bold font-heading mb-4 uppercase tracking-widest text-[#8B1A1A]">Company PR</h3>
              <p className="text-sm leading-relaxed text-neutral-500 italic">
                {company.prText}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200 mt-20">
        <div className="grid grid-cols-3 gap-8 w-full px-12 py-16 max-w-[1440px] mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-bold text-[#8B1A1A]">TraVerse</div>
            <p className="text-neutral-500 text-sm max-w-[240px]">
              日本全国の物流・運送会社をつなぐ次世代ロジスティクスプラットフォーム。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm mb-2">メニュー</div>
            <Link className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="/pc/search">運送会社を探す</Link>
            <a className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="#">空き車両を検索</a>
            <a className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="#">求人一覧</a>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm mb-2">サポート</div>
            <a className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="#">利用規約</a>
            <a className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="#">プライバシーポリシー</a>
            <a className="text-neutral-500 hover:underline decoration-[#8B1A1A] text-sm" href="#">お問い合わせ</a>
          </div>
        </div>
        <div className="w-full text-center py-8 border-t border-neutral-200 text-xs text-neutral-400">
          &copy; 2024 TraVerse Logistics. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
