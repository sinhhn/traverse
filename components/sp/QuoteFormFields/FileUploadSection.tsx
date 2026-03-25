'use client'

import { Upload } from 'lucide-react'

export interface FileUploadSectionProps {
  onFilesChange?: (files: FileList) => void
  maxFiles?: number
}

export function FileUploadSection({ onFilesChange, maxFiles = 3 }: FileUploadSectionProps) {
  return (
    <section>
      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
        <Upload size={18} className="text-[#8B1A1A]" />
        添付ファイル（任意）
      </h3>
      <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-[#8B1A1A]/40 transition-colors bg-neutral-50">
        <Upload size={24} className="text-neutral-400" />
        <span className="text-sm text-neutral-600 font-medium">ファイルを選択</span>
        <span className="text-xs text-neutral-400">最大{maxFiles}ファイル（各10MBまで）</span>
        <input
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={e => e.target.files && onFilesChange?.(e.target.files)}
        />
      </label>
    </section>
  )
}
