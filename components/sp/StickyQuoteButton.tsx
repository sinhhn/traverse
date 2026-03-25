'use client'

import { Button } from '@/components/ui'

export interface StickyQuoteButtonProps {
  companyName?: string
  onClick: () => void
}

export function StickyQuoteButton({ companyName, onClick }: StickyQuoteButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 z-20 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="max-w-[390px] mx-auto">
        {companyName && (
          <p className="text-xs text-neutral-500 text-center mb-2">{companyName}に見積依頼</p>
        )}
        <Button variant="primary" size="lg" className="w-full" onClick={onClick}>
          見積依頼する
        </Button>
      </div>
    </div>
  )
}
