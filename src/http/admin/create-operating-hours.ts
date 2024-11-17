import { api } from '@/lib/axios'

interface CreateOperatingHoursRequest {
  supportCenterId: string
  weekDays: number[]
  openTime: string
  closeTime: string
}

export async function createOperatingHours({
  supportCenterId,
  weekDays,
  openTime,
  closeTime,
}: CreateOperatingHoursRequest) {
  await api.post(`/support-center/${supportCenterId}/operating-hours`, {
    weekDays,
    openTime,
    closeTime,
  })
}
