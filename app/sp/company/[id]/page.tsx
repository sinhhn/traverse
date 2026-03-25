import { getCompanyById, getReviewsByCompany, getJobsByCompany, getVehiclesByCompany } from '@/lib/dummy'
import { notFound } from 'next/navigation'
import { CompanyDetailSP } from './CompanyDetailSP'

export default function CompanyPageSP({ params }: { params: { id: string } }) {
  const company = getCompanyById(params.id)
  if (!company) notFound()

  const reviews = getReviewsByCompany(params.id, 5)
  const jobs = getJobsByCompany(params.id)
  const vehicles = getVehiclesByCompany(params.id)

  return <CompanyDetailSP company={company} reviews={reviews} jobs={jobs} vehicles={vehicles} />
}
