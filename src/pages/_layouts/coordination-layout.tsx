import { Outlet, useNavigate } from 'react-router-dom'
import { CoordinationHeader } from '../coordination/header'
import { useAuth } from '@/context/authContext'
import { useEffect } from 'react'

export function CoordinationLayout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated, role } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated || role !== 'coordinator') {
      navigate('/login', { replace: true })
    }
  }, [isLoading, isAuthenticated, role, navigate])

  return (
    <div className="max-w-app mx-auto antialiased px-2 sm:px-0">
      <CoordinationHeader />

      <Outlet />
    </div>
  )
}
