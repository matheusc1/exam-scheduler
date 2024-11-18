import { api } from '@/lib/axios'

export async function getDisciplines() {
  const { data } = await api.get('/disciplines')

  return data.disciplines
}
