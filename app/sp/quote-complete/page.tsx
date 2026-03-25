import Link from 'next/link'
import { Button } from '@/components/ui'
import { CircleCheck } from 'lucide-react'

export default function QuoteCompletePage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto flex items-center justify-center px-6">
      <div className="text-center">
        <CircleCheck size={64} className="text-[#2E7D32] mx-auto mb-6" />
        <h1 className="text-xl font-bold mb-2">見積依頼を送信しました</h1>
        <p className="text-sm text-neutral-500 mb-8">
          運送会社からの回答をお待ちください。<br />
          通常1〜2営業日以内にご連絡いたします。
        </p>
        <Link href="/sp/home">
          <Button variant="primary" size="lg" className="w-full">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}
