import { dummyCompanies, dummyAvailableVehicles, getLatestNews } from '@/lib/dummy'
import { CompanyCardCompact } from '@/components/common/CompanyCard'
import { BottomTabBar } from '@/components/common/BottomTabBar'
import { Button } from '@/components/ui'
import { Search, ArrowRight, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { SPHeroMap } from './SPHeroMap'

export default function SpHomePage() {
  const availableVehicles = dummyAvailableVehicles.slice(0, 4)
  const latestNews = getLatestNews(3)
  const premiumCompanies = dummyCompanies.filter(c => c.plan === 'premium')

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-center px-6 h-14 bg-[#faf9f5]">
        <h1 className="font-heading tracking-tighter font-extrabold text-xl text-[#8B1A1A]">TraVerse</h1>
      </header>

      <main className="pt-14">
        {/* Hero Map */}
        <SPHeroMap companies={dummyCompanies.filter(c => c.plan === 'premium')} />

        {/* Search Entry Card */}
        <section className="mx-4 -mt-10 relative z-10">
          <div className="bg-white rounded-xl p-5 shadow-panel">
            <h2 className="text-lg font-bold mb-4">運送会社をさがす</h2>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                className="w-full h-12 pl-10 pr-4 bg-neutral-50 border-none rounded-lg text-sm"
                placeholder="エリアまたは会社名で検索..."
                readOnly
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1.5 bg-[#8B1A1A]/5 text-[#8B1A1A] rounded-full text-xs font-medium border border-[#8B1A1A]/10">冷凍車</span>
              <span className="px-3 py-1.5 bg-[#8B1A1A]/5 text-[#8B1A1A] rounded-full text-xs font-medium border border-[#8B1A1A]/10">当日対応</span>
              <span className="px-3 py-1.5 bg-[#8B1A1A]/5 text-[#8B1A1A] rounded-full text-xs font-medium border border-[#8B1A1A]/10">求人あり</span>
            </div>
            <Link href="/sp/wizard/step1">
              <Button variant="primary" size="lg" className="w-full">
                条件を指定して探す <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Available Vehicles */}
        <section className="mt-8">
          <div className="px-4 mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold">今すぐ空いている車両</h3>
          </div>
          <div className="flex overflow-x-auto px-4 gap-3 pb-2">
            {availableVehicles.map(v => {
              const company = dummyCompanies.find(c => c.id === v.companyId)
              if (!company) return null
              return <CompanyCardCompact key={v.id} company={company} vehicle={v} />
            })}
          </div>
        </section>

        {/* Transport Category Search */}
        <section className="mt-8 px-4">
          <div className="text-center mb-4">
            <h3 className="text-base font-bold">輸送カテゴリから探す</h3>
            <p className="text-xs text-neutral-400 mt-1">何を運ぶかで絞り込み</p>
            <div className="w-8 h-0.5 bg-[#8B1A1A] mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '📦', label: '一般貨物', desc: '製造・小売' },
              { emoji: '❄️', label: '冷凍・冷蔵', desc: '食品・医薬品' },
              { emoji: '🏠', label: '引越し', desc: '個人・法人' },
              { emoji: '💻', label: '精密機器', desc: 'IT・医療' },
              { emoji: '🏗️', label: '重量物', desc: '建材・機械' },
              { emoji: '⚡', label: '緊急便', desc: '当日対応' },
            ].map(cat => (
              <Link
                key={cat.label}
                href={`/sp/results?category=${encodeURIComponent(cat.label)}`}
                className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl border border-neutral-200 active:bg-neutral-50 transition-colors"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="font-bold text-xs text-neutral-800">{cat.label}</span>
                <span className="text-[10px] text-neutral-400">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Premium Companies */}
        <section className="mt-8">
          <div className="px-4 mb-3">
            <h3 className="text-base font-bold">おすすめの運送会社</h3>
          </div>
          <div className="flex overflow-x-auto px-4 gap-3 pb-2">
            {premiumCompanies.map(c => (
              <CompanyCardCompact key={c.id} company={c} />
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section className="mt-8 px-4">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <Newspaper size={16} />
            物流ニュース
          </h3>
          <div className="space-y-3">
            {latestNews.map(news => (
              <div key={news.id} className="bg-white rounded-xl p-4 border border-neutral-200">
                <span className="text-xs text-[#8B1A1A] font-medium">{news.category}</span>
                <h4 className="text-sm font-bold mt-1 line-clamp-2">{news.title}</h4>
                <p className="text-xs text-neutral-500 mt-1">{news.publishedAt}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomTabBar activeTab="home" />
    </div>
  )
}
