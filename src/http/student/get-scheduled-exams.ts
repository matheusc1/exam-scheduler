getScheduledExams

import { api } from '@/lib/axios'

interface GetScheduledExamsRequest {
  studentRa: string
}

export async function getScheduledExams({
  studentRa,
}: GetScheduledExamsRequest) {
  const { data } = await api.get(`/schedule?q=${studentRa}`)

  return data.schedules
}
