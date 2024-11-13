import { api } from '@/lib/axios'

interface CreateScheduleRequest {
  enrollmentId: string
  type: string
  scheduledDate: string
}

export async function createSchedule({
  enrollmentId,
  type,
  scheduledDate,
}: CreateScheduleRequest) {
  await api.post('/schedule', {
    enrollmentId,
    type,
    scheduledDate,
  })
}
