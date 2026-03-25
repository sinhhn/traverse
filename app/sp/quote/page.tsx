'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCompanyById } from '@/lib/dummy'
import { useWizardStore } from '@/lib/store/wizardStore'
import { NavbarSP } from '@/components/common/Navbar'
import { CargoSection, RequesterSection, FileUploadSection } from '@/components/sp/QuoteFormFields'
import { Checkbox, Button } from '@/components/ui'
import { Divider } from '@/components/ui'

export default function QuotePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-neutral-400">Loading...</span></div>}>
      <QuotePage />
    </Suspense>
  )
}

function QuotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const companyId = searchParams.get('company')
  const company = companyId ? getCompanyById(companyId) : null
  const wizardStore = useWizardStore()

  const [form, setForm] = useState({
    cargoContent: '',
    weight: '',
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    termsAgreed: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.cargoContent) errs.cargoContent = '荷物の内容を入力してください'
    if (!form.weight) errs.weight = '重量を入力してください'
    if (!form.companyName) errs.companyName = '会社名を入力してください'
    if (!form.contactPerson) errs.contactPerson = '担当者名を入力してください'
    if (!form.phone) errs.phone = '電話番号を入力してください'
    if (!form.email) errs.email = 'メールアドレスを入力してください'
    if (!form.termsAgreed) errs.termsAgreed = '利用規約に同意してください'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log('[MOCK SUBMIT] Quote form data:', { ...form, companyId, wizard: wizardStore })
    wizardStore.resetWizard()
    router.push('/sp/quote-complete')
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] max-w-[390px] mx-auto">
      <NavbarSP title="見積依頼" showBack showClose />
      <main className="pt-14 pb-32 px-5">
        {company && (
          <div className="py-4">
            <p className="text-sm text-neutral-500">依頼先: <strong>{company.name}</strong></p>
          </div>
        )}

        <div className="space-y-6">
          <CargoSection
            cargoContent={form.cargoContent}
            weight={form.weight}
            onCargoContentChange={v => setForm(f => ({ ...f, cargoContent: v }))}
            onWeightChange={v => setForm(f => ({ ...f, weight: v }))}
            errors={errors}
          />

          <Divider />

          <RequesterSection
            companyName={form.companyName}
            contactPerson={form.contactPerson}
            phone={form.phone}
            email={form.email}
            onChange={(field, value) => setForm(f => ({ ...f, [field]: value }))}
            errors={errors}
          />

          <Divider />

          <FileUploadSection />

          <Divider />

          <div>
            <Checkbox
              checked={form.termsAgreed}
              onChange={v => setForm(f => ({ ...f, termsAgreed: v }))}
              label="利用規約に同意する"
            />
            {errors.termsAgreed && <p className="text-sm text-red-500 mt-1">{errors.termsAgreed}</p>}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 z-20">
        <div className="max-w-[390px] mx-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? '送信中...' : '見積依頼を送信'}
          </Button>
        </div>
      </div>
    </div>
  )
}
