import { api } from '@/lib/axios'

interface DeletePeriodProps {
  periodId: string
}

export async function deletePeriod({ periodId }: DeletePeriodProps) {
  await api.delete(`/period/${periodId}`)
}
