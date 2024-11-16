import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '../admin/components/app-sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/authContext'
import { useEffect } from 'react'

export function AdminLayout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated, role } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated || role !== 'admin') {
      navigate('/login', { replace: true })
    }
  }, [isLoading, isAuthenticated, role, navigate])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="px-4 my-5 pt-2.5 space-y-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
