import type { QuoteRequest, FavoriteCompany } from '@/types'

export const dummyQuoteRequests: QuoteRequest[] = [
  // Active (依頼中) - has response
  {
    id: 'qr001',
    status: 'active',
    origin: '大阪',
    destination: '東京',
    vehicleType: '4t',
    temperature: '冷凍',
    requestedAt: '2026-03-25',
    companyIds: ['c001', 'c002'],
    hasResponse: true,
    isNew: true,
  },
  // Active (依頼中) - waiting
  {
    id: 'qr002',
    status: 'active',
    origin: '大阪',
    destination: '名古屋',
    vehicleType: '2t',
    temperature: '常温',
    requestedAt: '2026-03-24',
    companyIds: ['c004'],
    hasResponse: false,
    isNew: false,
  },
  // Active (依頼中) - expired
  {
    id: 'qr003',
    status: 'expired',
    origin: '東京',
    destination: '仙台',
    vehicleType: '10t',
    temperature: '常温',
    requestedAt: '2026-03-20',
    companyIds: [],
    hasResponse: false,
    isNew: false,
  },
  // Waiting (回答待ち)
  {
    id: 'qr004',
    status: 'waiting',
    origin: '東京',
    destination: '大阪',
    vehicleType: '4t',
    temperature: '冷蔵',
    requestedAt: '2026-03-23',
    companyIds: ['c001', 'c003'],
    hasResponse: false,
    isNew: false,
  },
  {
    id: 'qr005',
    status: 'waiting',
    origin: '福岡',
    destination: '広島',
    vehicleType: '2t',
    temperature: '冷蔵',
    requestedAt: '2026-03-22',
    companyIds: ['c005'],
    hasResponse: false,
    isNew: false,
  },
  // Completed (完了)
  {
    id: 'qr006',
    status: 'completed',
    origin: '大阪',
    destination: '京都',
    vehicleType: '軽貨物',
    temperature: '常温',
    requestedAt: '2026-03-15',
    companyIds: ['c003'],
    hasResponse: true,
    isNew: false,
  },
  {
    id: 'qr007',
    status: 'completed',
    origin: '東京',
    destination: '横浜',
    vehicleType: '2t',
    temperature: '常温',
    requestedAt: '2026-03-10',
    companyIds: ['c007', 'c002'],
    hasResponse: true,
    isNew: false,
  },
  {
    id: 'qr008',
    status: 'completed',
    origin: '名古屋',
    destination: '大阪',
    vehicleType: '4t',
    temperature: '冷凍',
    requestedAt: '2026-03-05',
    companyIds: ['c001'],
    hasResponse: true,
    isNew: false,
  },
  {
    id: 'qr009',
    status: 'completed',
    origin: '札幌',
    destination: '東京',
    vehicleType: '10t',
    temperature: '冷凍',
    requestedAt: '2026-02-28',
    companyIds: ['c008'],
    hasResponse: true,
    isNew: false,
  },
  {
    id: 'qr010',
    status: 'completed',
    origin: '神戸',
    destination: '大阪',
    vehicleType: '軽貨物',
    temperature: '常温',
    requestedAt: '2026-02-20',
    companyIds: ['c003'],
    hasResponse: true,
    isNew: false,
  },
]

export const dummyFavorites: FavoriteCompany[] = [
  { id: 'f001', companyId: 'c001', name: '山田運輸', initials: 'YU' },
  { id: 'f002', companyId: 'c002', name: '東洋物流', initials: 'TL' },
  { id: 'f003', companyId: 'c003', name: '関西ロジスティクス', initials: 'KL' },
  { id: 'f004', companyId: 'c007', name: '首都圏エクスプレス', initials: 'SE' },
]

export function getQuoteRequestsByStatus(status: 'active' | 'waiting' | 'completed'): QuoteRequest[] {
  if (status === 'active') {
    return dummyQuoteRequests.filter(q => q.status === 'active' || q.status === 'expired')
  }
  return dummyQuoteRequests.filter(q => q.status === status)
}
