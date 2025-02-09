import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import { NavHeader } from './nav-header'
import { NavMain } from './nav-main'
import {
  LucideBuilding,
  LucideCalendarCheck,
  LucideCalendarClock,
  LucideCalendarDays,
  LucideCalendarRange,
  LucideGraduationCap,
  LucideHourglass,
  LucideSquarePi,
  LucideUser,
} from 'lucide-react'
import { NavFooter } from './nav-footer'

const routes = [
  { url: '/admin/support-center', name: 'Polos', icon: LucideBuilding },
  {
    url: '/admin/operating-hours',
    name: 'Horários de funcionamento',
    icon: LucideHourglass,
  },
  {
    url: '/admin/available-dates',
    name: 'Datas disponíveis',
    icon: LucideCalendarClock,
  },
  { url: '/admin/periods', name: 'Períodos', icon: LucideCalendarRange },
  { url: '/admin/disciplines', name: 'Disciplinas', icon: LucideSquarePi },
  { url: '/admin/students', name: 'Alunos', icon: LucideUser },
  { url: '/admin/enrollments', name: 'Matrículas', icon: LucideGraduationCap },
  { url: '/admin/schedules', name: 'Agendamentos', icon: LucideCalendarDays },
  {
    url: '/admin/past-schedules',
    name: 'Avaliações passadas',
    icon: LucideCalendarCheck,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <NavHeader />

      <SidebarContent>
        <NavMain routes={routes} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  )
}
