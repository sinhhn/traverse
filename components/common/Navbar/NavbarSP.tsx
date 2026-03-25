'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, X } from 'lucide-react'

export interface NavbarSPProps {
  title: string
  showBack?: boolean
  showClose?: boolean
  onClose?: () => void
}

export function NavbarSP({
  title,
  showBack = false,
  showClose = false,
  onClose,
}: NavbarSPProps) {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 w-full z-[30] flex items-center justify-between px-4 h-14 bg-[#faf9f5]">
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center text-[#8B1A1A] hover:bg-neutral-100 transition-colors rounded-full"
            aria-label="戻る"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>
      <h1 className="font-heading tracking-tighter font-bold text-lg text-neutral-900">
        {title}
      </h1>
      <div className="w-10">
        {showClose && (
          <button
            onClick={onClose || (() => router.back())}
            className="w-10 h-10 flex items-center justify-center text-[#8B1A1A] hover:bg-neutral-100 transition-colors rounded-full"
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </header>
  )
}
