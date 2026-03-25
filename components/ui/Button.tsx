import type { ReactNode, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-burgundy/40 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-[#8B1A1A] text-white hover:bg-[#5C1111] active:bg-[#5C1111]',
    outlined: 'border border-[#8B1A1A] text-[#8B1A1A] hover:bg-burgundy-50 active:bg-burgundy-100',
    ghost: 'text-[#8B1A1A] hover:bg-burgundy-50 active:bg-burgundy-100',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-md gap-2',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
