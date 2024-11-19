import { api } from '@/lib/axios'

interface DeleteStudentRequest {
  studentRa: string
}

export async function deleteStudent({ studentRa }: DeleteStudentRequest) {
  await api.delete(`/students/${studentRa}`)
}
