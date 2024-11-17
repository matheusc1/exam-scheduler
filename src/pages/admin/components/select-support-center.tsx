import { useQuery } from '@tanstack/react-query'
import { getSupportCenters } from '@/http/coordination/get-support-centers'
import { LucideSchool } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface SupportCenter {
  id: string
  name: string
}

export function AdmSelectSupportCenter({ path }: { path: string }) {
  const { data: supportCenters } = useQuery<SupportCenter[]>({
    queryKey: ['get-support-centers'],
    queryFn: getSupportCenters,
    staleTime: Number.POSITIVE_INFINITY,
  })

  return (
    <div className="my-5 w-full space-y-5">
      <h2 className="font-semibold text-lg">Selecione o polo:</h2>

      <div className="flex flex-wrap gap-7 gap-y-5">
        {supportCenters?.map(supportCenter => (
          <Link
            key={supportCenter.id}
            to={`/admin/${path}/${supportCenter.id}`}
          >
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
        ))}
      </div>
    </div>
  )
}
