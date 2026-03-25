import { Check } from 'lucide-react'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          flex items-center justify-center w-5 h-5 rounded border-2 transition-colors
          focus:outline-none focus:ring-2 focus:ring-burgundy/40
          ${checked
            ? 'bg-[#8B1A1A] border-[#8B1A1A] text-white'
            : 'bg-white border-neutral-300 hover:border-[#8B1A1A]/60'}
        `}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </button>
      {label && <span className="text-base text-neutral-700">{label}</span>}
    </label>
  )
}
