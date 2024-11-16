import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface Routes {
  url: string
  icon: LucideIcon
  name: string
}

interface NavMainProps {
  routes: Routes[]
}

export function NavMain({ routes }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Rotas</SidebarGroupLabel>
      <SidebarMenu>
        {routes.map((route, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <SidebarMenuItem key={i}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold' : 'hover:font-bold'
              }
              to={route.url}
            >
              <SidebarMenuButton>
                <route.icon className="size-4" />
                <span>{route.name}</span>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
