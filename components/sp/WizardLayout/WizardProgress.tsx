export interface WizardProgressProps {
  steps: number
  current: number
}

export function WizardProgress({ steps, current }: WizardProgressProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: steps }, (_, i) => {
        const stepNum = i + 1
        const isDone = stepNum < current
        const isActive = stepNum === current

        return (
          <div key={stepNum} className="flex-1 flex items-center gap-1">
            <div className={`h-1 flex-1 rounded-full transition-colors ${
              isDone || isActive ? 'bg-[#8B1A1A]' : 'bg-neutral-200'
            }`} />
          </div>
        )
      })}
    </div>
  )
}
