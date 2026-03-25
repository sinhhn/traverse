'use client'

import type { ReactNode } from 'react'

export interface ComparisonRowProps {
  label: string
  values: (string | number | ReactNode)[]
  highlightBest?: boolean
  isNumeric?: boolean
  lowerIsBetter?: boolean
  bestIdx?: number
}

export function ComparisonRow({ label, values, highlightBest = false, isNumeric = false, lowerIsBetter = false, bestIdx: recommendedIdx = -1 }: ComparisonRowProps) {
  let topValueIdx = -1

  if (highlightBest && isNumeric && values.length > 0) {
    const nums = values.map(v => (typeof v === 'number' ? v : parseFloat(String(v))))
    if (nums.every(n => !isNaN(n))) {
      topValueIdx = lowerIsBetter
        ? nums.indexOf(Math.min(...nums))
        : nums.indexOf(Math.max(...nums))
    }
  }

  return (
    <tr className="border-t border-neutral-100">
      <td className="sticky left-0 bg-white z-20 py-3.5 px-6 font-medium text-neutral-500 text-sm">
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`py-3.5 px-6 text-sm ${
            i === recommendedIdx ? 'bg-[#FEFBEF]' : 'bg-white'
          } ${
            topValueIdx === i ? 'font-bold text-[#8B1A1A]' : 'text-neutral-800'
          }`}
        >
          {val}
        </td>
      ))}
    </tr>
  )
}
