import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  const { data } = await api.post('/login', { email, password })
  
  return data
}
