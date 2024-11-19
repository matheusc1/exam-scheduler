import { api } from '@/lib/axios'

interface UpdateStudentRequest {
  studentRa: string
  name: string
  email: string
  supportCenter: string
}

export async function updateStudent({
  studentRa,
  name,
  email,
  supportCenter,
}: UpdateStudentRequest) {
  await api.put(`/students/${studentRa}`, { name, email, supportCenter })
}
