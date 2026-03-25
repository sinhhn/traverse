// types/index.ts — All TypeScript types & interfaces for TraVerse prototype

export type VehicleType = '軽貨物' | '2t' | '4t' | '10t'
export type Temperature = '常温' | '冷蔵' | '冷凍'
export type CompanyPlan = 'premium' | 'standard' | 'free'
export type EmploymentType = '正社員' | '契約社員' | 'アルバイト' | '業務委託'
export type NewsCategory = '法改正' | '補助金' | '業界動向' | '企業ニュース' | '事故情報'
export type TimeSlot = 'am' | '12-14' | '14-16' | '16-18' | '18-20' | 'any'
export type WizardStep = 1 | 2
export type TargetCustomer = 'B2B' | 'B2C' | 'both'

export interface RatingBreakdown {
  deliveryQuality: number   // 配送品質
  responseSpeed: number     // 対応スピード
  priceValue: number        // 価格妥当性
  communication: number     // コミュニケーション
  overall: number           // 総合満足度
}

export interface VehicleInventory {
  type: VehicleType
  count: number
  hasRefrigeration: boolean
  hasWingBody: boolean
}

export interface Company {
  id: string
  name: string
  nameKana: string
  nameInitials: string
  plan: CompanyPlan
  prefecture: string
  city: string
  address: string
  lat: number
  lng: number
  established: number
  employeeCount: string
  capital: string
  licenseNumber: string
  mainClients: string
  logoColor: string

  vehicles: VehicleInventory[]
  specialties: string[]
  coverageAreas: string[]
  temperatures: Temperature[]
  canHandleUrgent: boolean
  operatingHours: string
  targetCustomer: TargetCustomer
  isAvailable24h: boolean
  isWeekendAvailable: boolean

  rating: number
  reviewCount: number
  ratingBreakdown: RatingBreakdown
  responseTimeHours: number
  successRate: number

  availableVehicleCount: number
  currentlyAvailable: boolean

  photos: string[]
  prText: string

  priceRangeMin: number
  priceRangeMax: number
}

export interface AvailableVehicle {
  id: string
  companyId: string
  type: VehicleType
  availableFrom: string
  availableTo: string
  departureArea: string
  destinationAreas: string[]
  temperature: Temperature
  canHandleUrgent: boolean
  priceNote?: string
}

export interface Review {
  id: string
  companyId: string
  authorInitials: string
  rating: number
  breakdown: RatingBreakdown
  text: string
  postedAt: string
  highlightTags?: string[]
}

export interface Job {
  id: string
  companyId: string
  title: string
  employmentType: EmploymentType
  salaryMin: number
  salaryMax: number
  salaryType: '月給' | '時給' | '日給'
  location: string
  requiredLicense: string
  vehicleType: VehicleType
  isActive: boolean
  postedAt: string
}

export interface NewsItem {
  id: string
  title: string
  category: NewsCategory
  summary: string
  publishedAt: string
  thumbnailPath?: string
}

export interface WizardState {
  step: WizardStep
  origin: string
  destination: string
  vehicleType: VehicleType | null
  temperature: Temperature | null
  isUrgent: boolean
  notes: string
  pickupDate: string | null
  pickupTimeSlot: TimeSlot | null
  deliveryDate: string | null
  deliveryTimeSlot: TimeSlot | null
}

export type MatchCardVariant = 'recommended' | 'available' | 'hiring' | 'standard' | 'unavailable'

export type QuoteRequestStatus = 'active' | 'waiting' | 'completed' | 'expired'

export interface QuoteRequest {
  id: string
  status: QuoteRequestStatus
  origin: string
  destination: string
  vehicleType: VehicleType
  temperature: Temperature
  requestedAt: string
  companyIds: string[]
  hasResponse: boolean
  isNew: boolean
}

export interface FavoriteCompany {
  id: string
  companyId: string
  name: string
  initials: string
}
