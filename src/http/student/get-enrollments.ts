import { api } from '@/lib/axios'

interface GetEnrollmentsRequest {
  studentRa: string
}

export async function getEnrollments({ studentRa }: GetEnrollmentsRequest) {
  const { data } = await api.get(`/enrollment/${studentRa}`)

  return data.enrollments
}
