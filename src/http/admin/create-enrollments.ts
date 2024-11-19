import { api } from '@/lib/axios'

interface CreateEnrollmentsRequest {
  studentRa: string[]
  disciplineId: string
  periodId: string
}

export async function createEnrollments({
  studentRa,
  disciplineId,
  periodId,
}: CreateEnrollmentsRequest) {
  await api.post('/enrollment', { studentRa, disciplineId, periodId })
}
