import { api } from '@/lib/axios'

export async function getPeriods() {
  const { data } = await api.get('/period')

  return data.period
}
