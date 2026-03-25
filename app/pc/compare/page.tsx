'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCompareStore } from '@/lib/store/compareStore'
import { dummyCompanies } from '@/lib/dummy'
import { ComparisonTable } from '@/components/pc/ComparisonTable'
import Link from 'next/link'
import { ChevronRight, Trash2, Info, Send } from 'lucide-react'

export default function ComparePage() {
  const router = useRouter()
  const { selectedIds, removeFromCompare, clearCompare } = useCompareStore()

  useEffect(() => {
    if (selectedIds.length === 0) {
      router.push('/pc/search')
    }
  }, [selectedIds.length, router])

  const companies = selectedIds
    .map(id => dummyCompanies.find(c => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)

  if (companies.length === 0) {
    return null // Will redirect
  }

  return (
    <main className="pt-24 pb-20 px-8 max-w-[1440px] mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <Link href="/" className="hover:text-[#8B1A1A] transition-colors">ホーム</Link>
        <ChevronRight size={14} />
        <Link href="/pc/search" className="hover:text-[#8B1A1A] transition-colors">検索結果</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-900">運送会社を比較</span>
      </nav>

      {/* Page Title & Controls */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold font-heading tracking-tighter mb-2">
            運送会社を比較する
          </h1>
          <p className="text-sm text-neutral-500 font-medium">
            {companies.length}社を選択中
          </p>
        </div>
        <button
          onClick={clearCompare}
          className="group flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-[#8B1A1A] transition-colors"
        >
          <Trash2 size={18} />
          <span className="border-b border-transparent group-hover:border-[#8B1A1A]">
            比較をクリア
          </span>
        </button>
      </div>

      {/* Comparison Table */}
      <ComparisonTable
        companies={companies}
        onRemove={removeFromCompare}
      />

      {/* Bulk Quote CTA */}
      <div className="mt-16 bg-gradient-to-br from-[#8B1A1A] to-[#5C1111] p-10 rounded-xl text-center text-white shadow-float">
        <h3 className="text-2xl font-bold font-heading tracking-tighter mb-2">
          {companies.length}社にまとめて見積依頼
        </h3>
        <p className="text-sm text-white/70 mb-8">
          同じ配送条件で一括送信。各社から個別に見積回答が届きます。
        </p>
        <button
          onClick={() => alert('[プロトタイプ] 一括見積依頼フォームへ遷移します')}
          className="inline-flex items-center gap-2 bg-white text-[#8B1A1A] px-10 py-4 rounded-lg font-bold text-md shadow-lg hover:bg-neutral-50 transition-colors"
        >
          <Send size={20} />
          一括見積依頼を送信する
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-neutral-100 rounded-lg flex items-center gap-6 border border-neutral-200/30">
        <Info size={32} className="text-[#8B1A1A] shrink-0" />
        <div className="text-sm leading-relaxed">
          <p className="font-bold mb-1">比較・一括見積について</p>
          <p className="text-neutral-500">
            表示されている情報は各社の最新データを元にしています。上部の「見積依頼」ボタンで各社に個別依頼、
            下部の「一括見積依頼」で選択した全社に同時に見積依頼を送信できます。
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-20 py-12 px-8 bg-neutral-100 border-t border-neutral-200/30 -mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] mx-auto">
          <div>
            <div className="text-lg font-bold text-[#8B1A1A] mb-4">TraVerse</div>
            <p className="text-xs text-neutral-500 leading-loose mb-6">
              物流業界のデジタルトランスフォーメーションを推進し、<br />
              最適な配送パートナーとの出会いを創出します。
            </p>
            <p className="text-xs tracking-wide text-neutral-400">
              &copy; 2024 TraVerse Logistics. All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-start md:justify-end">
            <a className="text-xs tracking-wide text-neutral-500 hover:text-[#8B1A1A] transition-colors" href="#">利用規約</a>
            <a className="text-xs tracking-wide text-neutral-500 hover:text-[#8B1A1A] transition-colors" href="#">プライバシーポリシー</a>
            <a className="text-xs tracking-wide text-neutral-500 hover:text-[#8B1A1A] transition-colors" href="#">運営会社</a>
            <a className="text-xs tracking-wide text-neutral-500 hover:text-[#8B1A1A] transition-colors" href="#">お問い合わせ</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
