import { api } from '@/lib/axios'

interface UpdateDisciplineProps {
  disciplineId: string
  name: string
}

export async function updateDiscipline({
  disciplineId,
  name,
}: UpdateDisciplineProps) {
  await api.put(`/disciplines/${disciplineId}`, { name })
}
