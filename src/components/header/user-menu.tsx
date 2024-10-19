import { Separator } from '../ui/separator'
import { LucideSettings, LucideMoon, LucideLogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import ModeToggle from '../theme/mode-toggle'

const Student = {
  name: 'John Doe',
}

export function UserMenu() {
  return (
    <>
      <div className="text-sm font-semibold p-2">{Student.name}</div>
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
        className="w-full gap-2 flex justify-start items-center p-2 text-red-500 hover:text-red-300"
      >
        <LucideLogOut className="size-4 " />
        <span className="font-medium">Sair</span>
      </Button>
    </>
  )
}
