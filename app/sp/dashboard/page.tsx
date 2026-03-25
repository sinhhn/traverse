'use client'

import { useState } from 'react'
import { getQuoteRequestsByStatus, dummyFavorites, getCompanyById } from '@/lib/dummy'
import type { QuoteRequest, QuoteRequestStatus } from '@/types'
import { Settings, ChevronRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type TabId = 'active' | 'waiting' | 'completed'

const tabs: { id: TabId; label: string }[] = [
  { id: 'active', label: '依頼中' },
  { id: 'waiting', label: '回答待ち' },
  { id: 'completed', label: '完了' },
]

export default function ShipperDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('active')

  const requests = getQuoteRequestsByStatus(activeTab)
  const activeCounts = {
    active: getQuoteRequestsByStatus('active').length,
    waiting: getQuoteRequestsByStatus('waiting').length,
    completed: getQuoteRequestsByStatus('completed').length,
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#faf9f5] sticky top-0 z-50">
        <h1 className="text-xl font-bold text-[#8B1A1A] italic font-heading tracking-tighter">マイページ</h1>
        <Settings size={22} className="text-[#8B1A1A] cursor-pointer" />
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* User Greeting */}
        <section className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center">
            <span className="text-[#8B1A1A] font-bold text-lg">田</span>
          </div>
          <div>
            <span className="text-[15px] font-bold">田中 花子 様</span>
            <p className="text-xs text-neutral-500">株式会社田中商事</p>
          </div>
        </section>

        {/* Success Banner */}
        <div className="bg-[#E8F5E9] border-y border-[#A5D6A7] h-11 flex items-center px-4 gap-2">
          <CheckCircle size={14} className="text-[#1B5E20] fill-[#1B5E20]" />
          <span className="text-[13px] text-[#1B5E20] font-medium">2社に見積依頼を送信しました</span>
        </div>

        {/* Tabs */}
        <nav className="bg-white border-b border-neutral-200 flex items-center h-11">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 relative ${
                  isActive ? 'border-b-2 border-[#8B1A1A]' : ''
                }`}
              >
                <span className={`text-[13px] ${isActive ? 'font-bold text-[#8B1A1A]' : 'font-medium text-neutral-400'}`}>
                  {tab.label}
                </span>
                <span className={`w-[18px] h-[18px] text-[10px] flex items-center justify-center rounded-full font-bold ${
                  isActive
                    ? 'bg-[#8B1A1A] text-white'
                    : tab.id === 'waiting'
                    ? 'bg-[#FDF3D0] text-[#7A5800]'
                    : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {activeCounts[tab.id]}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Quote Request Cards */}
        <div className="p-3 flex flex-col gap-2.5">
          {requests.map(req => (
            <QuoteRequestCard key={req.id} request={req} />
          ))}

          {requests.length === 0 && (
            <div className="text-center py-12 text-neutral-400">
              <p className="text-sm">該当する依頼はありません</p>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {activeTab === 'active' && (
          <section className="mx-3 mt-4 pt-4 border-t border-neutral-200/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13px] font-bold">お気に入り企業 ({dummyFavorites.length}社)</h3>
              <button className="text-[#8B1A1A] text-[11px] font-medium">すべて見る</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dummyFavorites.slice(0, 2).map(fav => (
                <Link
                  key={fav.id}
                  href={`/sp/company/${fav.companyId}`}
                  className="bg-neutral-50 p-3 rounded-lg flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[10px] font-bold text-neutral-500 border border-neutral-200">
                    {fav.initials}
                  </div>
                  <span className="text-[11px] font-medium truncate">{fav.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Nav */}
      <DashboardBottomNav />
    </div>
  )
}

function QuoteRequestCard({ request: req }: { request: QuoteRequest }) {
  const companyNames = req.companyIds
    .map(id => getCompanyById(id)?.name)
    .filter(Boolean)

  const statusConfig: Record<QuoteRequestStatus, { label: string; bgClass: string; textClass: string; borderClass: string }> = {
    active: req.hasResponse
      ? { label: '回答あり', bgClass: 'bg-[#E8F5E9]', textClass: 'text-[#1B5E20]', borderClass: 'border-l-[3px] border-l-[#1B5E20]' }
      : { label: '返答待ち', bgClass: 'bg-[#FDF3D0]', textClass: 'text-[#7A5800]', borderClass: '' },
    waiting: { label: '返答待ち', bgClass: 'bg-[#FDF3D0]', textClass: 'text-[#7A5800]', borderClass: '' },
    expired: { label: '期限切れ', bgClass: 'bg-neutral-200', textClass: 'text-neutral-500', borderClass: '' },
    completed: { label: '完了', bgClass: 'bg-neutral-200', textClass: 'text-neutral-500', borderClass: '' },
  }

  const config = statusConfig[req.status]
  const isExpired = req.status === 'expired'

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 ${config.borderClass} p-4 flex flex-col gap-3 shadow-sm ${isExpired ? 'opacity-65' : ''}`}>
      {/* Status + Date */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 ${config.bgClass} ${config.textClass} text-[10px] font-bold rounded-sm flex items-center gap-1`}>
            {req.hasResponse && req.status === 'active' && (
              <span className="w-2 h-2 bg-[#1B5E20] rounded-full animate-pulse" />
            )}
            {config.label}
          </span>
          {req.isNew && (
            <span className="text-[#8B1A1A] text-[9px] font-extrabold tracking-widest">NEW</span>
          )}
        </div>
        <span className="text-[11px] text-neutral-400">{req.requestedAt} 依頼</span>
      </div>

      {/* Route + Vehicle */}
      <h2 className="text-[14px] font-bold text-neutral-900">
        {req.origin} → {req.destination} / {req.vehicleType}トラック ({req.temperature})
      </h2>

      {/* Company Tags */}
      {companyNames.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {companyNames.map(name => (
            <div key={name} className="h-7 px-3 flex items-center rounded-full border border-neutral-200 bg-white text-[11px]">
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Note for waiting */}
      {req.status === 'active' && !req.hasResponse && (
        <p className="text-[11px] text-neutral-400 italic">通常1〜2時間以内に返答があります</p>
      )}

      {/* Action */}
      <div className="flex justify-end">
        {req.hasResponse && req.status === 'active' && (
          <button className="text-[#8B1A1A] text-[13px] font-bold flex items-center">
            回答を確認する
            <ChevronRight size={16} />
          </button>
        )}
        {isExpired && (
          <button className="text-[#8B1A1A] text-[13px] font-bold flex items-center opacity-100">
            再依頼する
            <ChevronRight size={16} />
          </button>
        )}
        {req.status === 'completed' && (
          <button className="text-neutral-500 text-[13px] font-medium flex items-center">
            詳細を見る
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

function DashboardBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-neutral-200 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-[390px] mx-auto">
        {[
          { icon: '📊', label: 'Dashboard', href: '/sp/dashboard', active: false },
          { icon: '📋', label: 'Quotes', href: '/sp/results', active: false },
          { icon: '🚚', label: 'Shipments', href: '/sp/home', active: false },
          { icon: '👤', label: 'Profile', href: '/sp/dashboard', active: true },
        ].map(item => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 pt-2 min-h-[44px] ${
              item.active
                ? 'text-[#8B1A1A] border-t-2 border-[#8B1A1A] -mt-px'
                : 'text-neutral-400'
            }`}
          >
            <span className="text-lg mb-0.5">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
