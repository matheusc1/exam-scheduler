import { api } from '@/lib/axios'

interface DeleteAllDatesRequest {
  supportCenterId: string
}

export async function deleteAllDates({
  supportCenterId,
}: DeleteAllDatesRequest) {
  await api.delete(`/support-center/${supportCenterId}/available-dates`)
}
