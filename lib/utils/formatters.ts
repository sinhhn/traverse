export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`
}

export function formatSalary(min: number, max: number, type: '月給' | '時給' | '日給'): string {
  return `${type} ${formatCurrency(min)}〜${formatCurrency(max)}`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}
