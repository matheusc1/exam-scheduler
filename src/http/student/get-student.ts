import { api } from '@/lib/axios'

interface GetStudentRequest {
  userId: string
}

export async function getStudent({ userId }: GetStudentRequest) {
  const { data } = await api.get(`/students/${userId}`)

  return data.student
}
