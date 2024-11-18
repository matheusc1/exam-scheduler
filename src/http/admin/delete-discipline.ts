import { api } from '@/lib/axios'

interface DeleteDisciplineProps {
  disciplineId: string
}

export async function deleteDiscipline({
  disciplineId,
}: DeleteDisciplineProps) {
  await api.delete(`/discipline/${disciplineId}`)
}
