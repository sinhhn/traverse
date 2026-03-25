import type { AvailableVehicle } from '@/types'

export const dummyAvailableVehicles: AvailableVehicle[] = [
  { id: 'v001', companyId: 'c001', type: '4t', temperature: '冷凍', availableFrom: '2026-03-24T14:00:00', availableTo: '2026-03-24T22:00:00', departureArea: '大阪府大阪市', destinationAreas: ['大阪府', '兵庫県', '京都府'], canHandleUrgent: true, priceNote: '応相談' },
  { id: 'v002', companyId: 'c001', type: '2t', temperature: '冷蔵', availableFrom: '2026-03-25T09:00:00', availableTo: '2026-03-25T18:00:00', departureArea: '大阪府堺市', destinationAreas: ['大阪府', '奈良県'], canHandleUrgent: false },
  { id: 'v003', companyId: 'c003', type: '軽貨物', temperature: '常温', availableFrom: '2026-03-24T10:00:00', availableTo: '2026-03-24T20:00:00', departureArea: '兵庫県神戸市', destinationAreas: ['兵庫県', '大阪府'], canHandleUrgent: true },
  { id: 'v004', companyId: 'c004', type: '4t', temperature: '常温', availableFrom: '2026-03-25T08:00:00', availableTo: '2026-03-25T17:00:00', departureArea: '愛知県名古屋市', destinationAreas: ['愛知県', '三重県', '岐阜県'], canHandleUrgent: false },
  { id: 'v005', companyId: 'c005', type: '2t', temperature: '冷蔵', availableFrom: '2026-03-24T06:00:00', availableTo: '2026-03-24T14:00:00', departureArea: '福岡県北九州市', destinationAreas: ['福岡県', '佐賀県'], canHandleUrgent: true },
  { id: 'v006', companyId: 'c006', type: '4t', temperature: '冷凍', availableFrom: '2026-03-26T07:00:00', availableTo: '2026-03-26T19:00:00', departureArea: '宮城県仙台市', destinationAreas: ['宮城県', '岩手県', '山形県'], canHandleUrgent: false },
  { id: 'v007', companyId: 'c007', type: '軽貨物', temperature: '常温', availableFrom: '2026-03-24T08:00:00', availableTo: '2026-03-24T18:00:00', departureArea: '東京都品川区', destinationAreas: ['東京都', '神奈川県'], canHandleUrgent: true },
  { id: 'v008', companyId: 'c008', type: '10t', temperature: '冷凍', availableFrom: '2026-03-25T06:00:00', availableTo: '2026-03-25T20:00:00', departureArea: '北海道札幌市', destinationAreas: ['北海道'], canHandleUrgent: false },
  { id: 'v009', companyId: 'c001', type: '10t', temperature: '冷蔵', availableFrom: '2026-03-26T10:00:00', availableTo: '2026-03-26T22:00:00', departureArea: '大阪府大阪市', destinationAreas: ['大阪府', '兵庫県', '京都府', '奈良県'], canHandleUrgent: true },
  { id: 'v010', companyId: 'c003', type: '2t', temperature: '常温', availableFrom: '2026-03-25T07:00:00', availableTo: '2026-03-25T19:00:00', departureArea: '兵庫県神戸市', destinationAreas: ['兵庫県', '大阪府', '京都府'], canHandleUrgent: false },
  { id: 'v011', companyId: 'c010', type: '10t', temperature: '常温', availableFrom: '2026-03-24T05:00:00', availableTo: '2026-03-24T15:00:00', departureArea: '神奈川県横浜市', destinationAreas: ['神奈川県', '東京都'], canHandleUrgent: true },
  { id: 'v012', companyId: 'c011', type: '2t', temperature: '冷蔵', availableFrom: '2026-03-25T05:00:00', availableTo: '2026-03-25T14:00:00', departureArea: '長野県松本市', destinationAreas: ['長野県', '山梨県'], canHandleUrgent: false },
  { id: 'v013', companyId: 'c012', type: '4t', temperature: '常温', availableFrom: '2026-03-24T07:00:00', availableTo: '2026-03-24T19:00:00', departureArea: '広島県広島市', destinationAreas: ['広島県', '岡山県'], canHandleUrgent: true },
  { id: 'v014', companyId: 'c013', type: '軽貨物', temperature: '常温', availableFrom: '2026-03-24T08:00:00', availableTo: '2026-03-24T20:00:00', departureArea: '沖縄県那覇市', destinationAreas: ['沖縄県'], canHandleUrgent: true },
  { id: 'v015', companyId: 'c016', type: '軽貨物', temperature: '冷蔵', availableFrom: '2026-03-24T06:00:00', availableTo: '2026-03-24T14:00:00', departureArea: '京都府京都市', destinationAreas: ['京都府', '大阪府'], canHandleUrgent: true },
]

export function getVehiclesByCompany(companyId: string): AvailableVehicle[] {
  return dummyAvailableVehicles.filter(v => v.companyId === companyId)
}

export function getAvailableVehiclesNow(): AvailableVehicle[] {
  const now = new Date()
  return dummyAvailableVehicles.filter(v => {
    const from = new Date(v.availableFrom)
    const to = new Date(v.availableTo)
    return from <= now && now <= to
  })
}
