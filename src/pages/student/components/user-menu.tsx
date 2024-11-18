import { Separator } from '../../../components/ui/separator'
import { LucideSettings, LucideMoon, LucideLogOut } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'
import ModeToggle from '../../../components/theme/mode-toggle'
import { useAuth } from '@/context/auth-context'

interface UserMenuProps {
  name: string
}

export function UserMenu({ name }: UserMenuProps) {
  const { logoutFn } = useAuth()

  function handleLogout() {
    logoutFn()
  }

  return (
    <>
      <div className="text-sm font-semibold p-2">{name}</div>
      <Separator className="my-0.5" />

      <Link to="/profile">
        <Button
          variant="ghost"
          className="w-full gap-2 flex justify-start items-center p-2 text-ring"
        >
          <LucideSettings className="size-4" />
          <span className="font-medium">Perfil</span>
        </Button>
      </Link>

      <Separator className="my-0.5" />

      <div className="flex items-center justify-between p-2 text-ring">
        <div className="flex items-center gap-2">
          <LucideMoon className="size-4" />
          <span className="font-medium">Tema escuro</span>
        </div>
        <ModeToggle />
      </div>

      <Separator className="my-0.5" />

      <Button
        variant="ghost"
        className="w-full gap-2 flex justify-start items-center p-2 text-red-500 hover:text-red-800 dark:hover:text-red-300"
        onClick={handleLogout}
      >
        <LucideLogOut className="size-4 " />
        <span className="font-medium">Sair</span>
      </Button>
    </>
  )
}
