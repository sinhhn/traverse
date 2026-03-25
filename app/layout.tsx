import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TraVerse — 物流ナビサイト',
  description: '物流会社を探す・比較する・見積もりを依頼する',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
