import { Header } from '@/pages/student/components/header/header'
import { useAuth } from '@/context/authContext'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function Layout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated, role } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated || role !== 'student') {
      navigate('/login', { replace: true })
    }
  }, [isLoading, isAuthenticated, role, navigate])

  return (
    <div className="max-w-app mx-auto antialiased px-2 sm:px-0">
      <Header />

      <Outlet />
    </div>
  )
}
