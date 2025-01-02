import { api } from '@/lib/axios'

interface CreateSupportCenterRequest {
  name: string
  numberOfComputers: number
}

export async function createSupportCenter({
  name,
  numberOfComputers,
}: CreateSupportCenterRequest) {
  await api.post('/support-center', { name, numberOfComputers })
}
