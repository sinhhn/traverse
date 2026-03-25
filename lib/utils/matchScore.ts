import type { Company, WizardState } from '@/types'

export function calculateMatchScore(company: Company, wizard: WizardState): number {
  let score = 0
  // Vehicle type match (30 pts)
  if (wizard.vehicleType && company.vehicles.some(v => v.type === wizard.vehicleType))
    score += 30
  // Temperature match (25 pts)
  if (wizard.temperature && company.temperatures.includes(wizard.temperature))
    score += 25
  // Area match (25 pts)
  if (wizard.origin) {
    const prefecture = wizard.origin.slice(0, 3)
    if (company.coverageAreas.some(a => a.startsWith(prefecture)))
      score += 25
  }
  // Urgency (10 pts)
  if (wizard.isUrgent && company.canHandleUrgent) score += 10
  // Availability bonus (10 pts)
  if (company.currentlyAvailable) score += 10
  return score
}

export function getMatchResults(wizard: WizardState, companies: Company[]) {
  return companies
    .map(c => ({ company: c, score: calculateMatchScore(c, wizard) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
}
