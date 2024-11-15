import { api } from '@/lib/axios'

interface GetSchedulesRequest {
  supportCenterId: string
}

export async function getSchedules({ supportCenterId }: GetSchedulesRequest) {
  const { data } = await api.get(
    `/schedule/support-center?q=${supportCenterId}`
  )

  return data.schedules
}
