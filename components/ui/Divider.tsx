export interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  if (label) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-xs text-neutral-500 font-medium">{label}</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>
    )
  }

  return <hr className="border-neutral-200" />
}
