import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/authContext'
import { LucideLock } from 'lucide-react'

export function Profile() {
  const { student } = useAuth()

  return (
    <div className="my-10 flex flex-col sm:flex-row gap-10 items-center sm:items-start">
      <div className="bg-zinc-100 dark:bg-zinc-900 space-y-6 w-89 sm:w-96 px-5 py-6 rounded-lg">
        <p className="font-medium">Informações básicas</p>
        <div className="flex items-center justify-center">
          <Avatar className="size-24">
            <AvatarImage alt="Profile image" />
            <AvatarFallback className="bg-[#2CACDD] dark:bg-[#0FB091]">
              {student?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <Label htmlFor="ra">RA</Label>
            <Input disabled id="ra" placeholder={student?.ra} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input disabled id="name" placeholder={student?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input disabled id="email" placeholder={student?.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Data de nascimento</Label>
            <Input disabled id="email" placeholder={student?.birthDate} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportCenter">Polo</Label>
            <Input
              disabled
              id="supportCenter"
              placeholder={student?.supportCenter?.name}
            />
          </div>
        </div>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-900 w-89 space-y-4 sm:w-96 px-5 py-6 rounded-lg">
        <div className="space-y-10">
          <p className="font-medium">Alterar senha</p>
          <div className="flex items-center justify-center">
            <LucideLock strokeWidth={1} className="size-14" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="password">Senha atual</Label>
              <Input disabled id="password" placeholder="Informe sua senha" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                disabled
                id="newPassword"
                placeholder="Informe sua nova senha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmation">Confirmação</Label>
              <Input
                disabled
                id="confirmation"
                placeholder="Confirme sua nova senha"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button disabled variant="outline" className="py-5">
            Cancelar
          </Button>
          <Button
            disabled
            className="transition-colors bg-gradient-to-r from-[#2CACDD] to-[#0FB091] hover:from-[#1A8AC4] hover:to-[#0C926A]"
          >
            Alterar senha
          </Button>
        </div>
      </div>
    </div>
  )
}
