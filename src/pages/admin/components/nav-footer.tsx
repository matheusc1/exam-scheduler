import ModeToggle from '@/components/theme/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuth } from '@/context/auth-context'
import { LucideChevronsUpDown, LucideLogOut, LucideMoon } from 'lucide-react'

export function NavFooter() {
  const { isMobile } = useSidebar()
  const { logoutFn } = useAuth()

  function handleLogout() {
    logoutFn()
  }

  return (
    <SidebarMenu>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton size="lg">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage alt="UNIFAA logo" />
              <AvatarFallback className="rounded-lg bg-gradient-to-r from-[#2CACDD] to-[#0FB091]">
                U
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">UNIFAA</span>
              <span className="truncate text-xs">unifaa@admin.com</span>
            </div>
            <LucideChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-1"
          side={isMobile ? 'bottom' : 'right'}
          align="end"
          sideOffset={4}
        >
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
    </SidebarMenu>
  )
}
