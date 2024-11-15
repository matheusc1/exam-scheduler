import { useQuery } from '@tanstack/react-query'
import { SupportCenterCard } from './support-center-card'
import { getSupportCenters } from '@/http/coordination/get-support-centers'

export interface SupportCenter {
  id: string
  name: string
}

export function SelectSupportCenter() {
  const { data: supportCenters } = useQuery<SupportCenter[]>({
    queryKey: ['get-support-centers'],
    queryFn: getSupportCenters,
    staleTime: Number.POSITIVE_INFINITY,
  })

  return (
    <div className="my-5 w-full space-y-10">
      <h2 className="font-semibold text-lg">Selecione o polo:</h2>

      <div className="flex flex-wrap gap-7 gap-y-5">
        {supportCenters?.map(supportCenter => (
          <SupportCenterCard
            key={supportCenter.id}
            supportCenter={supportCenter}
          />
        ))}
      </div>
    </div>
  )
}
