import { api } from '@/lib/axios'

interface GetOperatingHoursRequest {
  supportCenterId: string
}

export async function getOperatingHours({
  supportCenterId,
}: GetOperatingHoursRequest) {
  const { data } = await api.get(
    `/support-center/${supportCenterId}/operating-hours`
  )

  return data.operatingHours
}
