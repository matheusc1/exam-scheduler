import { api } from '@/lib/axios'

interface CreateDisciplineProps {
  name: string
}

export async function createDiscipline({ name }: CreateDisciplineProps) {
  await api.post('/disciplines', { name })
}
