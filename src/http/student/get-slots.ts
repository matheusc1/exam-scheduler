import { api } from '@/lib/axios'
import dayjs from 'dayjs'

interface GetSlotsRequest {
  supportCenterId: string
  selectedDate: Date
}

export async function getSlots({
  supportCenterId,
  selectedDate,
}: GetSlotsRequest) {
  const { data } = await api.get(
    `/support-center/${supportCenterId}/available-slots?date=${dayjs(selectedDate).format('YYYY-MM-DD')}`
  )

  return data.slots
}
