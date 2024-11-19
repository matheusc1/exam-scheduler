import { api } from '@/lib/axios'

export async function getDisciplines() {
  const { data } = await api.get('/discipline')

  return data.disciplines
}
