import { api } from '@/lib/axios'

interface DeleteSupportCenterRequest {
  id: string
}

export async function deleteSupportCenter({ id }: DeleteSupportCenterRequest) {
  await api.delete(`/support-center/${id}`)
}
