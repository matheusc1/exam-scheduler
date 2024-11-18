import { api } from '@/lib/axios'

interface DeleteAvailableDateRequest {
  supportCenterId: string
  selectedDate: Date
}

export async function deleteAvailableDate({
  supportCenterId,
  selectedDate,
}: DeleteAvailableDateRequest) {
  await api.delete(
    `/support-center/${supportCenterId}/available-slots?date=${selectedDate}`
  )
}
