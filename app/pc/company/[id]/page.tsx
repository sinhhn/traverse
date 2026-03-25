import { notFound } from 'next/navigation'
import { getCompanyById, getReviewsByCompany, getJobsByCompany, getVehiclesByCompany } from '@/lib/dummy'
import { CompanyDetailClient } from './CompanyDetailClient'

interface Props {
  params: { id: string }
}

export default function CompanyDetailPage({ params }: Props) {
  const company = getCompanyById(params.id)
  if (!company) notFound()

  const reviews = getReviewsByCompany(params.id, 10)
  const jobs = getJobsByCompany(params.id)
  const vehicles = getVehiclesByCompany(params.id)

  return (
    <CompanyDetailClient
      company={company}
      reviews={reviews}
      jobs={jobs}
      vehicles={vehicles}
    />
  )
}
