'use client'

import type { Company } from '@/types'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { MapPin } from 'lucide-react'

import { GOOGLE_MAPS_KEY as MAPS_KEY } from '@/lib/config'

export function SPHeroMap({ companies }: { companies: Company[] }) {
  if (!MAPS_KEY) {
    return (
      <section className="relative w-full h-[200px] bg-neutral-200 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
          <MapPin size={40} className="text-[#8B1A1A] opacity-30" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#faf9f5] to-transparent" />
      </section>
    )
  }

  return (
    <section className="relative w-full h-[200px] overflow-hidden">
      <APIProvider apiKey={MAPS_KEY}>
        <Map
          defaultCenter={{ lat: 35.5, lng: 137.0 }}
          defaultZoom={5}
          gestureHandling="none"
          disableDefaultUI
          mapId="sp-hero-map"
          style={{ width: '100%', height: '100%' }}
        >
          {companies.map(c => (
            <AdvancedMarker
              key={c.id}
              position={{ lat: c.lat, lng: c.lng }}
            >
              <div className="w-3 h-3 bg-[#8B1A1A] rounded-full border-2 border-white shadow-md" />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#faf9f5] to-transparent pointer-events-none" />
    </section>
  )
}
