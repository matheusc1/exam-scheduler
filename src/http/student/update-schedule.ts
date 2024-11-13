import { api } from '@/lib/axios'

interface UpdateScheduleRequest {
  newScheduledDate: string
  scheduleId: string
}

export async function updateSchedule({
  scheduleId,
  newScheduledDate,
}: UpdateScheduleRequest) {
  await api.put(`/schedule/${scheduleId}`, { newScheduledDate })
}
