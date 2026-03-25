import { NavbarPC } from '@/components/common/Navbar'

export default function PCLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-w-[1024px]">
      <NavbarPC />
      {children}
    </div>
  )
}
