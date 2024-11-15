import { api } from '@/lib/axios'

export async function getSupportCenters() {
  const { data } = await api.get('/support-center')

  return data.supportCenters
}
