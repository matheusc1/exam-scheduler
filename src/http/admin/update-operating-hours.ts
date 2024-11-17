import { api } from '@/lib/axios'

interface UpdateOperatingHoursRequest {
  supportCenterId: string
  operatingHoursId: string
  weekDays?: number
  weekDay?: number
  openTime: string
  closeTime: string
}

export async function updateOperatingHours({
  supportCenterId,
  operatingHoursId,
  weekDays,
  weekDay,
  openTime,
  closeTime,
}: UpdateOperatingHoursRequest) {
  await api.put(
    `/support-center/${supportCenterId}/operating-hours/${operatingHoursId}`,
    {
      weekDay,
      weekDays,
      openTime,
      closeTime,
    }
  )
}
