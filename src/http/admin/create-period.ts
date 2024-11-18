import { api } from '@/lib/axios'

interface CreatePeriodProps {
  startDate: Date
  endDate: Date
}

export async function createPeriod({ startDate, endDate }: CreatePeriodProps) {
  await api.post('period', { startDate, endDate })
}
