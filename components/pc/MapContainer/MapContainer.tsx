'use client'

import type { Company } from '@/types'
import { CompanyPin } from './CompanyPin'
import { CompanyPopup } from './CompanyPopup'
import { MapPin } from 'lucide-react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'

export interface MapContainerProps {
  companies: Company[]
  activePin: string | null
  onPinClick: (id: string) => void
  onPinClose: () => void
  height?: string
  className?: string
  center?: { lat: number; lng: number }
  zoom?: number
}

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

export function MapContainer({
  companies,
  activePin,
  onPinClick,
  onPinClose,
  height = '100%',
  className = '',
  center,
  zoom,
}: MapContainerProps) {

  // Calculate bounds-based center & zoom from companies if not provided
  const mapCenter = center ?? (companies.length > 0
    ? {
        lat: companies.reduce((s, c) => s + c.lat, 0) / companies.length,
        lng: companies.reduce((s, c) => s + c.lng, 0) / companies.length,
      }
    : { lat: 36.5, lng: 138.0 })

  const mapZoom = zoom ?? (companies.length > 0
    ? (() => {
        // Calculate spread to determine zoom
        const lats = companies.map(c => c.lat)
        const lngs = companies.map(c => c.lng)
        const latSpread = Math.max(...lats) - Math.min(...lats)
        const lngSpread = Math.max(...lngs) - Math.min(...lngs)
        const spread = Math.max(latSpread, lngSpread)
        if (spread < 0.5) return 12   // Same city
        if (spread < 1) return 11     // Same prefecture
        if (spread < 2) return 10     // Nearby prefectures
        if (spread < 5) return 8      // Region
        return 6                       // Nationwide
      })()
    : 6)

  // Google Maps mode
  if (MAPS_KEY) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
        <APIProvider apiKey={MAPS_KEY}>
          <Map
            defaultCenter={mapCenter}
            defaultZoom={mapZoom}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId="traverse-map"
            style={{ width: '100%', height: '100%' }}
          >
            {companies.map(company => (
              <AdvancedMarker
                key={company.id}
                position={{ lat: company.lat, lng: company.lng }}
                onClick={() => onPinClick(company.id)}
              >
                <CompanyPin
                  company={company}
                  isActive={activePin === company.id}
                  onClick={() => onPinClick(company.id)}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>

        {/* Popup overlay */}
        {activePin && (() => {
          const company = companies.find(c => c.id === activePin)
          if (!company) return null
          return (
            <div className="absolute top-4 right-4 z-10">
              <CompanyPopup company={company} onClose={onPinClose} />
            </div>
          )
        })()}
      </div>
    )
  }

  // Static fallback
  const getPosition = (company: Company, index: number) => {
    const baseLat = 35.0
    const baseLng = 135.0
    const top = Math.max(10, Math.min(85, 50 - (company.lat - baseLat) * 30 + (index % 3) * 5))
    const left = Math.max(10, Math.min(85, 50 + (company.lng - baseLng) * 15 + (index % 4) * 3))
    return { top: `${top}%`, left: `${left}%` }
  }

  return (
    <div className={`relative w-full bg-neutral-200 overflow-hidden ${className}`} style={{ height }}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-150">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-neutral-400" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-neutral-400" style={{ left: `${i * 5}%` }} />
          ))}
        </div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-300/60" />
        <div className="absolute top-0 left-1/3 w-0.5 h-full bg-neutral-300/60" />
        <div className="absolute top-0 left-2/3 w-0.5 h-full bg-neutral-300/60" />

        {companies.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-neutral-400">
              <MapPin size={48} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">地図（Google Maps APIキー未設定）</p>
              <p className="text-xs mt-1">Prototype mode: map disabled</p>
            </div>
          </div>
        )}
      </div>

      {companies.map((company, i) => {
        const pos = getPosition(company, i)
        const isActive = activePin === company.id
        return (
          <div
            key={company.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="relative">
              <CompanyPin company={company} isActive={isActive} onClick={() => onPinClick(company.id)} />
              {isActive && <CompanyPopup company={company} onClose={onPinClose} />}
            </div>
          </div>
        )
      })}

      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white shadow-md flex items-center justify-center rounded-sm hover:bg-neutral-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-600"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
        </button>
        <button className="w-10 h-10 bg-white shadow-md flex items-center justify-center rounded-sm hover:bg-neutral-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-600"><path d="M19 13H5v-2h14v2z" /></svg>
        </button>
      </div>
    </div>
  )
}
