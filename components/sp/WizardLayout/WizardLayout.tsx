import type { ReactNode } from 'react'
import { NavbarSP } from '@/components/common/Navbar'
import { WizardProgress } from './WizardProgress'

export interface WizardLayoutProps {
  step: number
  title: string
  children: ReactNode
  bottomBar?: ReactNode
}

export function WizardLayout({ step, title, children, bottomBar }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto">
      <NavbarSP title={title} showBack showClose />
      <main className="pt-14 pb-32 px-5">
        <section className="py-6">
          <WizardProgress steps={2} current={step} />
        </section>
        {children}
      </main>
      {bottomBar && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 z-20">
          <div className="max-w-[390px] mx-auto">
            {bottomBar}
          </div>
        </div>
      )}
    </div>
  )
}
