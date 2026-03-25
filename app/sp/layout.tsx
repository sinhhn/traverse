export default function SPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-[#faf9f5]">
      {children}
    </div>
  )
}
