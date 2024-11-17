import { api } from '@/lib/axios'

interface DeleteOperatingHoursRequest {
  supportCenterId: string
  operatingHoursId: string
}

export async function deleteOperatingHours({
  supportCenterId,
  operatingHoursId,
}: DeleteOperatingHoursRequest) {
  await api.delete(
    `/support-center/${supportCenterId}/operating-hours/${operatingHoursId}`
  )
}
