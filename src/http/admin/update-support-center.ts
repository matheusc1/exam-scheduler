import { api } from '@/lib/axios'

interface UpdateSupportCenterRequest {
  id: string
  name: string
  numberOfComputers: number
}

export async function updateSupportCenter({
  id,
  name,
  numberOfComputers,
}: UpdateSupportCenterRequest) {
  await api.put(`/support-center/${id}`, { name, numberOfComputers })
}
