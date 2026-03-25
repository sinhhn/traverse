'use client'

import { Input } from '@/components/ui'
import { Building, User, Phone, Mail } from 'lucide-react'

export interface RequesterSectionProps {
  companyName: string
  contactPerson: string
  phone: string
  email: string
  onChange: (field: string, value: string) => void
  errors?: Record<string, string>
}

export function RequesterSection({ companyName, contactPerson, phone, email, onChange, errors }: RequesterSectionProps) {
  return (
    <section>
      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
        <Building size={18} className="text-[#8B1A1A]" />
        依頼者の情報
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">会社名 *</label>
          <Input
            placeholder="例: 株式会社〇〇"
            value={companyName}
            onChange={e => onChange('companyName', e.target.value)}
            icon={<Building size={16} />}
            error={errors?.companyName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">担当者名 *</label>
          <Input
            placeholder="例: 山田太郎"
            value={contactPerson}
            onChange={e => onChange('contactPerson', e.target.value)}
            icon={<User size={16} />}
            error={errors?.contactPerson}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">電話番号 *</label>
          <Input
            type="tel"
            placeholder="例: 03-1234-5678"
            value={phone}
            onChange={e => onChange('phone', e.target.value)}
            icon={<Phone size={16} />}
            error={errors?.phone}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">メールアドレス *</label>
          <Input
            type="email"
            placeholder="例: yamada@example.com"
            value={email}
            onChange={e => onChange('email', e.target.value)}
            icon={<Mail size={16} />}
            error={errors?.email}
          />
        </div>
      </div>
    </section>
  )
}
