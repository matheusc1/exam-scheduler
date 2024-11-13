import { api } from '@/lib/axios'

export async function verifyToken() {
  const { data } = await api.get('/verify-token')

  return data.user
}
