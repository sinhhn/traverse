import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[]
  placeholder?: string
}

export function Select({
  options,
  placeholder = '選択してください',
  className = '',
  ...props
}: SelectProps) {
  return (
    <select
      className={`
        w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-base text-neutral-900
        focus:outline-none focus:ring-2 focus:ring-burgundy/40 focus:border-[#8B1A1A]
        disabled:bg-neutral-50 disabled:text-neutral-400
        appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23888780%22%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-10
        ${className}
      `}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
