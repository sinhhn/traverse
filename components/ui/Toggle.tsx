export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-burgundy/40 focus:ring-offset-2
          ${checked ? 'bg-[#8B1A1A]' : 'bg-neutral-300'}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform mt-0.5
            ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}
          `}
        />
      </button>
      {label && <span className="text-base text-neutral-700">{label}</span>}
    </label>
  )
}
