import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  LucideChevronDown,
  LucideLogOut,
  LucideMenu,
  LucideMoon,
  LucideSettings,
  LucideX,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import ModeToggle from '../theme/mode-toggle'
import { Link, NavLink } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { Button } from '../ui/button'

const Student = {
  name: 'John Doe',
  email: 'john@acme.com',
  avatar: 'https://github.com/matheusc1.png',
}

export function Header() {
  return (
    <Popover>
      <Collapsible>
        <div className="w-full flex justify-between items-center pt-10">
          {/* Mobile menu button*/}
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <CollapsibleTrigger className="group relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir menu</span>
              <LucideMenu
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <LucideX
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </CollapsibleTrigger>
          </div>

          {/* Nav bar */}
          <div className="flex flex-1 items-center justify-center">
            <h1 className="bg-gradient-to-r from-[#2CACDD] to-[#0FB091] text-transparent bg-clip-text font-bold text-2xl">
              UNIFAA
            </h1>

            <div className="hidden sm:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-3">
                  <NavLink
                    to="/"
                    className="rounded-full px-3 py-2 text-sm font-medium text-center aria-[current=page]:bg-secondary hover:bg-secondary"
                  >
                    Agendar avaliação
                  </NavLink>

                  <NavLink
                    to="/support"
                    className="rounded-full px-3 py-2 text-sm font-medium text-center aria-[current=page]:bg-secondary hover:bg-secondary"
                  >
                    Suporte
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm">{Student.name}</p>
              <p className="text-muted-foreground text-xs">{Student.email}</p>
            </div>
            <Avatar className="size-8">
              <AvatarImage src={Student.avatar} alt="Profile image" />
              <AvatarFallback>{Student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <PopoverTrigger>
              <LucideChevronDown className="size-5 text-zinc-500 hover:text-zinc-300" />
            </PopoverTrigger>
          </div>
        </div>

        {/* Mobile nav bar */}
        <CollapsibleContent className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/"
              className="block rounded-md px-3 py-2 text-sm font-medium aria-[current=page]:bg-secondary hover:bg-secondary"
            >
              Agendar avaliação
            </NavLink>

            <NavLink
              to="/support"
              className="block rounded-md px-3 py-2 text-sm font-medium aria-[current=page]:bg-secondary hover:bg-secondary"
            >
              Suporte
            </NavLink>
          </div>
        </CollapsibleContent>

        <Separator className="w-full mt-4" />

        {/* User menu */}
        <PopoverContent className="w-[224px] p-1">
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
        </PopoverContent>
      </Collapsible>
    </Popover>
  )
}
