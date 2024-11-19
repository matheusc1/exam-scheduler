import { api } from '@/lib/axios'

export async function getEnrollments() {
  const { data } = await api.get('/enrollment')

  return data.enrollments
}
