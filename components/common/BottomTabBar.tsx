'use client'

import Link from 'next/link'
import { Home, Search, Truck, Bell, User } from 'lucide-react'

export interface BottomTabBarProps {
  activeTab: 'home' | 'search' | 'vehicles' | 'notifications' | 'profile'
}

const tabs = [
  { id: 'home' as const, label: 'ホーム', icon: Home, href: '/sp/home' },
  { id: 'search' as const, label: '探す', icon: Search, href: '/sp/wizard/step1' },
  { id: 'vehicles' as const, label: '空き車両', icon: Truck, href: '/sp/results' },
  { id: 'notifications' as const, label: '通知', icon: Bell, href: '/sp/home' },
  { id: 'profile' as const, label: 'マイページ', icon: User, href: '/sp/home' },
]

export function BottomTabBar({ activeTab }: BottomTabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-14 bg-white border-t border-neutral-200 z-[30] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-full max-w-[390px] mx-auto">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab
          const Icon = tab.icon
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center ${
                isActive ? 'text-[#8B1A1A]' : 'text-neutral-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
