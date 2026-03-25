import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: ReactNode
  error?: string
}

export function Input({
  icon,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        )}
        <input
          className={`
            w-full rounded-lg border bg-white px-3 py-2.5 text-base text-neutral-900
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-burgundy/40 focus:border-[#8B1A1A]
            disabled:bg-neutral-50 disabled:text-neutral-400
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : 'border-neutral-200'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
