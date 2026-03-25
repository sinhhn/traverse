export interface ProgressBarProps {
  steps: number
  currentStep: number
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: steps }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep

        return (
          <div key={stepNum} className="flex items-center gap-2">
            <div
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors
                ${isDone ? 'bg-[#8B1A1A] text-white' : ''}
                ${isActive ? 'bg-[#8B1A1A] text-white ring-4 ring-burgundy-100' : ''}
                ${!isDone && !isActive ? 'bg-neutral-200 text-neutral-500' : ''}
              `}
            >
              {stepNum}
            </div>
            {stepNum < steps && (
              <div className={`w-8 h-0.5 ${isDone ? 'bg-[#8B1A1A]' : 'bg-neutral-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
