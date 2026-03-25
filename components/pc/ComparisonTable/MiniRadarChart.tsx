'use client'

import dynamic from 'next/dynamic'
import type { RatingBreakdown } from '@/types'

const RechartsRadarMini = dynamic(
  () =>
    import('recharts').then(mod => {
      const { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } = mod
      return function MiniRadarInner({ breakdown, color }: { breakdown: RatingBreakdown; color: string }) {
        const data = [
          { axis: '配送品質', value: breakdown.deliveryQuality },
          { axis: '対応速度', value: breakdown.responseSpeed },
          { axis: '価格', value: breakdown.priceValue },
          { axis: 'コミュニケ\nーション', value: breakdown.communication },
          { axis: '総合', value: breakdown.overall },
        ]

        return (
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
              <PolarGrid stroke="#e8e6e0" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: '#888780' }} />
              <Radar
                dataKey="value"
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        )
      }
    }),
  {
    ssr: false,
    loading: () => <div className="h-[180px] flex items-center justify-center text-neutral-300 text-xs">読込中...</div>,
  }
)

export interface MiniRadarChartProps {
  breakdown: RatingBreakdown
  color?: string
}

export function MiniRadarChart({ breakdown, color = '#8B1A1A' }: MiniRadarChartProps) {
  return <RechartsRadarMini breakdown={breakdown} color={color} />
}
