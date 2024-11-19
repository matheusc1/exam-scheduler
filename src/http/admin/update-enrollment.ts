import { api } from '@/lib/axios'

interface UpdateEnrollmentRequest {
  enrollmentId: string
  studentRa: string
  disciplineId: string
  periodId: string
}

export async function updateEnrollment({
  enrollmentId,
  studentRa,
  disciplineId,
  periodId,
}: UpdateEnrollmentRequest) {
  await api.put(`/enrollment/${enrollmentId}`, {
    studentRa,
    disciplineId,
    periodId,
  })
}
