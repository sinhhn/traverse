'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavbarPCProps {
  activeLink?: string
}

const navLinks = [
  { href: '/pc/search', label: '運送会社を探す' },
  { href: '/pc/search', label: '空き車両' },
  { href: '/pc/search', label: '求人' },
  { href: '/pc/search', label: '料金' },
]

export function NavbarPC({ activeLink }: NavbarPCProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full h-[60px] z-[30] bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(140,113,110,0.08)]">
      <div className="flex justify-between items-center px-8 max-w-[1440px] mx-auto w-full h-full">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-[#8B1A1A] font-heading">
            TraVerse
          </Link>
          <div className="hidden md:flex gap-8 text-sm tracking-tight">
            {navLinks.map(link => {
              const isActive = activeLink === link.href || pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? 'text-[#8B1A1A] font-bold border-b-2 border-[#8B1A1A] pb-1'
                      : 'text-neutral-600 hover:text-[#8B1A1A] transition-colors'
                  }
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-neutral-600 text-sm font-medium hover:opacity-80 transition-opacity">
            ログイン
          </button>
          <button className="px-5 py-2 border border-[#8B1A1A] text-[#8B1A1A] text-sm font-bold rounded-sm hover:bg-[#8B1A1A] hover:text-white transition-all">
            企業登録
          </button>
        </div>
      </div>
    </nav>
  )
}
