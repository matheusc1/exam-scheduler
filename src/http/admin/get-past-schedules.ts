import { api } from '@/lib/axios'

interface GetSchedulesRequest {
  supportCenterId: string
}

export async function getPastSchedules({
  supportCenterId,
}: GetSchedulesRequest) {
  const { data } = await api.get(
    `/past-schedule/support-center?q=${supportCenterId}`
  )

  return data.schedules
}
