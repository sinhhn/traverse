'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    router.replace(isMobile ? '/sp/home' : '/pc')
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-50">
      <span className="text-neutral-400 text-sm">Loading...</span>
    </div>
  )
}
