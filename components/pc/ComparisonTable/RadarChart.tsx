'use client'

import dynamic from 'next/dynamic'
import type { Company } from '@/types'

const RechartsRadar = dynamic(
  () =>
    import('recharts').then(mod => {
      const { RadarChart: RC, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } = mod
      return function RadarChartInner({ companies }: { companies: Company[] }) {
        const axes = [
          { key: 'deliveryQuality', label: '配送品質' },
          { key: 'responseSpeed', label: '対応スピード' },
          { key: 'priceValue', label: '価格妥当性' },
          { key: 'communication', label: 'コミュニケーション' },
          { key: 'overall', label: '総合満足度' },
        ]

        const colors = ['#8B1A1A', '#C9A227', '#003450']

        const data = axes.map(axis => {
          const entry: Record<string, string | number> = { axis: axis.label }
          companies.forEach((c) => {
            entry[c.name] = c.ratingBreakdown[axis.key as keyof typeof c.ratingBreakdown]
          })
          return entry
        })

        return (
          <ResponsiveContainer width="100%" height={400}>
            <RC cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e0bfbc" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: '#58413f' }} />
              {companies.map((c, i) => (
                <Radar
                  key={c.id}
                  name={c.name}
                  dataKey={c.name}
                  stroke={colors[i % colors.length]}
                  fill={colors[i % colors.length]}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
              />
            </RC>
          </ResponsiveContainer>
        )
      }
    }),
  { ssr: false, loading: () => <div className="h-[400px] flex items-center justify-center text-neutral-400">チャートを読み込み中...</div> }
)

export interface RadarChartProps {
  companies: Company[]
}

export function ComparisonRadarChart({ companies }: RadarChartProps) {
  return <RechartsRadar companies={companies} />
}
