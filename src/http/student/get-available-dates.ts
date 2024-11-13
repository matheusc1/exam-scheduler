import { api } from '@/lib/axios'

interface GetAvailableDatesRequest {
  supportCenterId: string
}

export async function getAvailableDates({
  supportCenterId,
}: GetAvailableDatesRequest) {
  const { data } = await api.get(
    `/support-center/${supportCenterId}/available-dates`
  )

  return data.availableDates
}
