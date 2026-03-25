'use client'

export interface PrefectureSelectProps {
  value: string | null
  onChange: (value: string | null) => void
}

const prefectures = [
  '北海道',
  '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export function PrefectureSelect({ value, onChange }: PrefectureSelectProps) {
  return (
    <div className="relative">
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value || null)}
        className="w-full bg-neutral-50 border-none text-sm py-3 px-4 focus:ring-0 focus:border-b-2 focus:border-[#8B1A1A] transition-all appearance-none cursor-pointer rounded-sm"
      >
        <option value="">都道府県を選択</option>
        {prefectures.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  )
}
