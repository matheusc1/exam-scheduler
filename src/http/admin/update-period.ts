import { api } from '@/lib/axios'

interface UpdatePeriodProps {
  periodId: string
  startDate: Date
  endDate: Date
}

export async function updatePeriod({
  periodId,
  startDate,
  endDate,
}: UpdatePeriodProps) {
  await api.put(`/period/${periodId}`, { startDate, endDate })
}
