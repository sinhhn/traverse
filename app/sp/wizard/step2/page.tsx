'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useWizardStore } from '@/lib/store/wizardStore'
import { WizardLayout } from '@/components/sp/WizardLayout'
import { DateSelector } from '@/components/sp/DateSelector'
import { TimeSlotGrid } from '@/components/sp/TimeSlotGrid'
import { Button } from '@/components/ui'

export default function WizardStep2Page() {
  const router = useRouter()
  const store = useWizardStore()

  // Guard: redirect if step 1 not complete
  useEffect(() => {
    if (!store.vehicleType || !store.temperature || !store.origin) {
      router.replace('/sp/wizard/step1')
    }
  }, [store.vehicleType, store.temperature, store.origin, router])

  function handleSearch() {
    router.push('/sp/results')
  }

  const originShort = store.origin?.split('市')[0] || '発地'
  const destShort = store.destination?.split('市')[0] || '着地'
  const summary = `${originShort}→${destShort} / ${store.vehicleType || ''} ${store.temperature || ''}`

  return (
    <WizardLayout
      step={2}
      title="見積依頼"
      bottomBar={
        <div>
          <p className="text-xs text-neutral-500 text-center mb-2 truncate">{summary}</p>
          <Button variant="primary" size="lg" className="w-full" onClick={handleSearch}>
            マッチ結果を見る
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Pickup Date */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-3">集荷希望日</label>
          <DateSelector
            value={store.pickupDate}
            onChange={d => store.setField('pickupDate', d)}
          />
        </div>

        {/* Pickup Time */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-3">集荷希望時間帯</label>
          <TimeSlotGrid
            value={store.pickupTimeSlot}
            onChange={s => store.setField('pickupTimeSlot', s)}
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-3">配送希望日</label>
          <DateSelector
            value={store.deliveryDate}
            onChange={d => store.setField('deliveryDate', d)}
          />
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-3">配送希望時間帯</label>
          <TimeSlotGrid
            value={store.deliveryTimeSlot}
            onChange={s => store.setField('deliveryTimeSlot', s)}
          />
        </div>
      </div>
    </WizardLayout>
  )
}
