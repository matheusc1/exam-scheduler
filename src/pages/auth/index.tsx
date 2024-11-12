import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/authContext'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { toast } = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleLogin(formData: SignInForm) {
    try {
      const { data } = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      })

      login(data.role, data.id)

      if (data.role === 'admin') navigate('/admin')
      if (data.role === 'coordinator') navigate('/coordination')
      if (data.role === 'student') navigate('/')
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'E-mail ou senha inválidos',
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-10 space-y-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="bg-gradient-to-r from-[#2CACDD] to-[#0FB091] text-transparent bg-clip-text font-bold text-2xl">
            UNIFAA
          </h2>
          <p className="font-semibold">Login - Agendamento de avaliação</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Usuário</Label>
              <Input
                className="w-full"
                type="email"
                placeholder="Informe seu e-mail"
                {...register('email')}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Senha</Label>
              <Input
                className="w-full"
                type="password"
                placeholder="Informe sua senha"
                {...register('password')}
                required
              />
            </div>
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#0FB091] hover:bg-[#0C926A]"
          >
            Acessar
          </Button>
        </form>
      </div>
    </div>
  )
}
