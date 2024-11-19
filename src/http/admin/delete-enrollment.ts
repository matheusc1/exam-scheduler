import { api } from '@/lib/axios'

interface DeleteEnrollmentRequest {
  enrollmentId: string
}

export async function deleteEnrollment({
  enrollmentId,
}: DeleteEnrollmentRequest) {
  await api.delete(`/enrollment/${enrollmentId}`)
}
