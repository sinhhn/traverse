'use client'

import { MapContainer } from '@/components/pc/MapContainer'
import { SearchPanel } from '@/components/pc/SearchPanel'
import { dummyCompanies, dummyAvailableVehicles } from '@/lib/dummy'
import { useSearchStore } from '@/lib/store/searchStore'
import { VehicleTypeBadge } from '@/components/common/VehicleTypeBadge'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Crown } from 'lucide-react'

export default function PCHomePage() {
  const { activePin, setActivePin } = useSearchStore()

  // All companies for the map
  const mapCompanies = dummyCompanies.slice(0, 8)

  // Available vehicles (first 4)
  const availableVehicles = dummyAvailableVehicles.slice(0, 4)
  const vehicleCompanyMap = new Map(
    dummyCompanies.map(c => [c.id, c])
  )

  return (
    <main className="pt-[60px]">
      {/* Hero Section with Map */}
      <section className="relative w-full h-[520px] bg-neutral-100">
        <MapContainer
          companies={mapCompanies}
          activePin={activePin}
          onPinClick={setActivePin}
          onPinClose={() => setActivePin(null)}
          height="520px"
        />

        {/* Floating Search Panel */}
        <div className="absolute top-5 left-8 z-20 max-h-[480px] overflow-y-auto rounded-sm">
          <SearchPanel />
        </div>
      </section>

      {/* Section 2: Available Vehicles */}
      <section className="py-24 bg-neutral-50 max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold text-[#8B1A1A] tracking-[0.2em] uppercase mb-3 block">
              Real-time Availability
            </span>
            <h2 className="text-3xl font-heading font-extrabold tracking-tighter">
              今すぐ稼働できる空き車両
            </h2>
          </div>
          <Link
            href="/pc/search"
            className="text-sm font-bold text-[#8B1A1A] flex items-center gap-1 hover:underline underline-offset-8"
          >
            すべての空き車両を見る
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {availableVehicles.map(v => {
            const company = vehicleCompanyMap.get(v.companyId)
            return (
              <div
                key={v.id}
                className="bg-white p-6 shadow-card border-l-2 border-neutral-100 hover:border-[#8B1A1A] transition-all group"
              >
                {/* Vehicle image */}
                <div className="mb-6 overflow-hidden aspect-[4/3] bg-neutral-100 relative rounded-sm">
                  {company?.photos?.[0] ? (
                    <img src={company.photos[0]} alt={`${company.name} 車両`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-neutral-300">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="bg-available-text text-white text-[10px] px-2 py-1 font-bold rounded-sm shadow-lg uppercase">
                      空き車両あり
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base mb-1">
                  {company?.name ?? '不明な会社'}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <VehicleTypeBadge type={v.type} />
                  {v.temperature !== '常温' && (
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 font-bold rounded-full">
                      {v.temperature}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <MapPin size={14} className="text-neutral-400" />
                    出発地: {v.departureArea}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar size={14} className="text-neutral-400" />
                    稼働日: {new Date(v.availableFrom).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })} 〜
                  </div>
                </div>

                <button className="w-full py-2 text-xs font-bold text-[#8B1A1A] border border-burgundy-100 hover:bg-[#8B1A1A] hover:text-white transition-colors rounded-sm">
                  問い合わせる
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Transport Category Search */}
      <section className="py-20 max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-extrabold tracking-tighter mb-3">
            輸送カテゴリから探す
          </h2>
          <p className="text-neutral-500 text-sm">何を運ぶかで、最適な運送会社を絞り込み</p>
          <div className="w-12 h-1 bg-[#8B1A1A] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-6 gap-6">
          {[
            { emoji: '📦', label: '一般貨物', desc: '製造・小売・卸', specialties: ['一般貨物'] },
            { emoji: '❄️', label: '冷凍・冷蔵', desc: '食品・医薬品', specialties: ['冷凍輸送', '冷蔵便', 'チルド輸送'] },
            { emoji: '🏠', label: '引越し', desc: '個人・法人', specialties: ['引越し補助'] },
            { emoji: '💻', label: '精密機器', desc: 'IT・医療機器', specialties: ['精密機器'] },
            { emoji: '🏗️', label: '重量物', desc: '建材・機械', specialties: ['重量物', '鉄鋼輸送'] },
            { emoji: '⚡', label: '緊急便', desc: '当日・即日対応', specialties: ['緊急'] },
          ].map(cat => (
            <Link
              key={cat.label}
              href={`/pc/search?category=${encodeURIComponent(cat.label)}`}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-neutral-200 hover:border-[#8B1A1A]/30 hover:shadow-panel transition-all group cursor-pointer"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="font-bold text-sm text-neutral-800">{cat.label}</span>
              <span className="text-xs text-neutral-400">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Premium Feature Callout */}
      <section className="bg-neutral-100 py-20 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 z-10">
            <div className="inline-flex items-center gap-2 bg-gold-light px-3 py-1 mb-6 rounded-full">
              <Crown size={14} className="text-gold-800" />
              <span className="text-[10px] font-bold text-gold-800 tracking-widest uppercase">
                Premium Service
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tighter mb-8 leading-tight">
              信頼と品質を、<br />
              <span className="text-[#8B1A1A] italic">物流</span>の新しいスタンダードへ
            </h2>
            <p className="text-neutral-600 mb-10 max-w-lg leading-relaxed">
              TraVerseは、厳選された優良運送会社のみが登録できるクローズドな物流ポータルです。
              高度な検索機能とリアルタイムの空き車両情報で、貴社の物流課題を即座に解決します。
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-[#8B1A1A] text-white font-bold rounded-sm shadow-lg hover:shadow-xl transition-all">
                今すぐ無料で登録
              </button>
              <button className="px-8 py-4 bg-white text-neutral-800 font-bold rounded-sm border border-neutral-200 hover:bg-neutral-50 transition-all">
                サービス詳細を見る
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="w-full aspect-square max-w-[500px] bg-white p-4 shadow-2xl rounded-sm transform rotate-3">
              <img src="/dummy-images/companies/premium.jpg" alt="TraVerse Premium Service" className="w-full h-full object-cover" />
            </div>
            {/* Decorative text */}
            <div className="absolute -bottom-10 -left-10 text-[120px] font-extrabold text-[#8B1A1A]/5 select-none pointer-events-none -z-10">
              TRAVERSE
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 bg-neutral-100 border-t border-neutral-200/20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <h3 className="text-2xl font-bold tracking-tighter text-[#8B1A1A] mb-6 font-heading">
                TraVerse
              </h3>
              <p className="text-xs text-neutral-500 leading-loose max-w-xs">
                日本の物流をよりスマートに、より美しく。運送会社と荷主を繋ぐ、次世代の高品質マッチングプラットフォーム。
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><Link className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="/pc/search">運送会社を探す</Link></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">車両登録（運送会社様向け）</a></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">求人掲載</a></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">料金プラン</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-8">Support</h4>
              <ul className="space-y-4">
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">ヘルプセンター</a></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">利用規約</a></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">プライバシーポリシー</a></li>
                <li><a className="text-xs font-medium text-neutral-600 hover:text-[#8B1A1A] transition-colors" href="#">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-neutral-200/40">
            <span className="text-[10px] text-neutral-400 tracking-widest uppercase">
              &copy; 2024 TraVerse. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
