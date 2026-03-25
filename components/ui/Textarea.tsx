import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export function Textarea({
  rows = 3,
  error,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        rows={rows}
        className={`
          w-full rounded-lg border bg-white px-3 py-2.5 text-base text-neutral-900
          placeholder:text-neutral-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-burgundy/40 focus:border-[#8B1A1A]
          disabled:bg-neutral-50 disabled:text-neutral-400
          ${error ? 'border-red-500' : 'border-neutral-200'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
