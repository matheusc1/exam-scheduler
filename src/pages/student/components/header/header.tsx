import { LucideMenu, LucideX } from 'lucide-react'
import { Popover, PopoverContent } from '../../../../components/ui/popover'
import { Separator } from '../../../../components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../components/ui/collapsible'
import { NavBar } from './nav-bar'
import { MobileNavBar } from './mobile-nav-bar'
import { UserMenu } from './user-menu'
import { useAuth } from '@/context/authContext'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import type { StudentType } from '../../profile'

export function Header() {
  const [student, setStudent] = useState<StudentType>()
  const { userId } = useAuth()

  useEffect(() => {
    async function getStudent() {
      if (userId) {
        const { data } = await api.get(`/students/${userId}`)

        setStudent({
          id: data.id,
          ra: data.ra,
          name: data.name,
          email: data.email,
          birthDate: data.birthDate,
          supportCenter: data.supportCenter,
        })
      }
    }

    getStudent()
  }, [userId])

  return (
    <Popover>
      <Collapsible>
        <div className="w-full flex justify-between items-center pt-10">
          {/* Mobile menu button*/}
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            <CollapsibleTrigger className="group relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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

          <NavBar name={student?.name ?? ''} email={student?.email ?? ''} />
        </div>

        <CollapsibleContent className="sm:hidden">
          <MobileNavBar />
        </CollapsibleContent>

        <Separator className="w-full mt-4" />

        <PopoverContent className="w-[224px] p-1">
          <UserMenu name={student?.name ?? ''} />
        </PopoverContent>
      </Collapsible>
    </Popover>
  )
}
