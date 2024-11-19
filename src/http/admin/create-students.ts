import { api } from '@/lib/axios'

interface CreateStudentsRequest {
  students: {
    ra: string
    name: string
    email: string
    birthDate: Date
    supportCenter: string
  }[]
}

export async function createStudents({ students }: CreateStudentsRequest) {
  await api.post('/students', students)
}
