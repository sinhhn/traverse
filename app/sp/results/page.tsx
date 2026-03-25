'use client'

import { useRouter } from 'next/navigation'
import { useWizardStore } from '@/lib/store/wizardStore'
import { dummyCompanies, getJobsByCompany } from '@/lib/dummy'
import { getMatchResults } from '@/lib/utils/matchScore'
import { NavbarSP } from '@/components/common/Navbar'
import { ConditionSummaryChip } from '@/components/sp/ConditionSummaryChip'
import { MatchCard } from '@/components/sp/MatchCard'
import { Button } from '@/components/ui'
import type { MatchCardVariant } from '@/types'

function getVariant(company: typeof dummyCompanies[0]): MatchCardVariant {
  if (!company.currentlyAvailable && company.availableVehicleCount === 0) return 'unavailable'
  if (company.plan === 'premium') return 'recommended'
  if (company.availableVehicleCount > 0) return 'available'
  if (getJobsByCompany(company.id).length > 0) return 'hiring'
  return 'standard'
}

export default function MatchResultsPage() {
  const router = useRouter()
  const store = useWizardStore()

  const results = getMatchResults(store, dummyCompanies)

  const conditionSummary = [
    store.origin && store.destination ? `${store.origin}→${store.destination}` : null,
    store.vehicleType,
    store.temperature,
    store.isUrgent ? '緊急' : null,
  ].filter(Boolean).join(' / ')

  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto">
      <NavbarSP title="マッチ結果" showBack />
      <main className="pt-14 pb-8 px-4">
        {/* Condition Summary */}
        <div className="py-4">
          <ConditionSummaryChip
            conditions={conditionSummary || '条件未設定'}
            onEdit={() => router.push('/sp/wizard/step1')}
          />
        </div>

        <p className="text-sm text-neutral-500 mb-4">
          {results.length}社がマッチしました
        </p>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map(({ company, score }) => (
              <MatchCard
                key={company.id}
                company={company}
                matchScore={score}
                variant={getVariant(company)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">マッチする会社が見つかりませんでした</p>
            <Button variant="outlined" onClick={() => router.push('/sp/wizard/step1')}>
              条件を変更する
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
