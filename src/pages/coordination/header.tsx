import ModeToggle from '@/components/theme/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/auth-context'
import { LucideLogOut, LucideMoon, LucideSettings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function CoordinationHeader() {
  const { logoutFn } = useAuth()

  function handleLogout() {
    logoutFn()
  }

  return (
    <Popover>
      <div className="w-full flex justify-between items-center pt-5">
        <h1 className="bg-gradient-to-r from-[#2CACDD] to-[#0FB091] text-transparent bg-clip-text font-bold text-2xl">
          <NavLink to="/coordination/select">UNIFAA</NavLink>
        </h1>

        <PopoverTrigger>
          <LucideSettings className="size-4" />
        </PopoverTrigger>
      </div>

      <Separator className="w-full mt-4" />

      <PopoverContent className="w-[224px] p-1">
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
      </PopoverContent>
    </Popover>
  )
}
