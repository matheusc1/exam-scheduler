import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../../components/ui/avatar'
import { PopoverTrigger } from '../../../../components/ui/popover'
import { LucideChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Student = {
  name: 'John Doe',
  email: 'john@acme.com',
  avatar: 'https://github.com/matheusc1.png',
}

export function NavBar() {
  return (
    <>
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
    </>
  )
}
