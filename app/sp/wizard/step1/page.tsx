'use client'

import { useRouter } from 'next/navigation'
import { useWizardStore } from '@/lib/store/wizardStore'
import { WizardLayout } from '@/components/sp/WizardLayout'
import { VehicleTypeGrid } from '@/components/sp/VehicleTypeGrid'
import { TemperatureToggle } from '@/components/sp/TemperatureToggle'
import { Input, Toggle, Textarea, Button } from '@/components/ui'
import { MapPin } from 'lucide-react'
import { useState } from 'react'

export default function WizardStep1Page() {
  const router = useRouter()
  const store = useWizardStore()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!store.origin) errs.origin = '発地を入力してください'
    if (!store.destination) errs.destination = '配送先を入力してください'
    if (!store.vehicleType) errs.vehicleType = '車両タイプを選択してください'
    if (!store.temperature) errs.temperature = '温度帯を選択してください'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleNext() {
    if (validate()) {
      store.nextStep()
      router.push('/sp/wizard/step2')
    }
  }

  const summary = [
    store.vehicleType && `${store.vehicleType}トラック`,
    store.temperature,
    store.isUrgent && '緊急対応',
  ].filter(Boolean).join(' · ') || '条件を選択してください'

  return (
    <WizardLayout
      step={1}
      title="見積依頼"
      bottomBar={
        <div>
          <p className="text-xs text-neutral-500 text-center mb-2">{summary}</p>
          <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
            次へ — 日時を選択
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Origin */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2">発地 *</label>
          <Input
            placeholder="都道府県・市区町村"
            value={store.origin}
            onChange={e => store.setField('origin', e.target.value)}
            icon={<MapPin size={16} />}
            error={errors.origin}
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2">配送先 *</label>
          <Input
            placeholder="都道府県・市区町村"
            value={store.destination}
            onChange={e => store.setField('destination', e.target.value)}
            icon={<MapPin size={16} />}
            error={errors.destination}
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2">車両タイプ *</label>
          <VehicleTypeGrid
            value={store.vehicleType}
            onChange={v => store.setField('vehicleType', v)}
          />
          {errors.vehicleType && <p className="text-sm text-red-500 mt-1">{errors.vehicleType}</p>}
        </div>

        {/* Temperature */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2">温度帯 *</label>
          <TemperatureToggle
            value={store.temperature}
            onChange={t => store.setField('temperature', t)}
          />
          {errors.temperature && <p className="text-sm text-red-500 mt-1">{errors.temperature}</p>}
        </div>

        {/* Urgent */}
        <div>
          <Toggle
            checked={store.isUrgent}
            onChange={v => store.setField('isUrgent', v)}
            label="緊急対応が必要"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-bold text-neutral-800 mb-2">備考</label>
          <Textarea
            placeholder="特記事項があれば入力してください"
            value={store.notes}
            onChange={e => store.setField('notes', e.target.value)}
          />
        </div>
      </div>
    </WizardLayout>
  )
}
