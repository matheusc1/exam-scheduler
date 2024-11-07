import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-10 space-y-5 rounded-md bg-zinc-100 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="bg-gradient-to-r from-[#2CACDD] to-[#0FB091] text-transparent bg-clip-text font-bold text-2xl">
            UNIFAA
          </h2>
          <p className="font-semibold">Login - Agendamento de avaliação</p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Usuário</Label>
            <Input
              className="w-full"
              type="email"
              placeholder="Informe seu e-mail"
            />
          </div>

          <div className="space-y-1">
            <Label>Senha</Label>
            <Input
              className="w-full"
              type="password"
              placeholder="Informe sua senha"
            />
          </div>
        </div>

        <Button className="w-full bg-[#0FB091] hover:bg-[#0C926A]">
          Acessar
        </Button>
      </div>
    </div>
  )
}
