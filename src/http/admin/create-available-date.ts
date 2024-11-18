import { api } from '@/lib/axios'

interface CreateAvailableDatesRequest {
  supportCenterId: string
  startDate: Date
  endDate: Date
  weekDays: number[]
}

export async function createAvailableDates({
  supportCenterId,
  startDate,
  endDate,
  weekDays,
}: CreateAvailableDatesRequest) {
  await api.post(`/support-center/${supportCenterId}/available-slots`, {
    startDate,
    endDate,
    weekDays,
  })
}
