import { LucideSchool } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { SupportCenter } from './select-support-center'

interface SupportCenterCardProps {
  supportCenter: SupportCenter
}

export function SupportCenterCard({ supportCenter }: SupportCenterCardProps) {
  return (
    <Link to={`/coordination/${supportCenter.id}`}>
      <button
        type="button"
        className="size-[181px] rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 hover:dark:bg-zinc-700"
      >
        <div className="flex flex-col gap-5 items-center justify-center">
          <LucideSchool className="size-8" />
          <p className="text-sm font-semibold">{supportCenter.name}</p>
        </div>
      </button>
    </Link>
  )
}
