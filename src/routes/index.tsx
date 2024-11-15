import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/student/schedule'
import { Support } from '../pages/student/support'
import { Profile } from '../pages/student/profile'
import { SignIn } from '../pages/auth'
import { StudentLayout } from '../pages/_layouts/student-layout'
import { CoordinationLayout } from '../pages/_layouts/coordination-layout'
import { AdminPage } from '@/pages/admin'
import { CoordinationPage } from '@/pages/coordination'
import { SelectSupportCenter } from '@/pages/coordination/select-support-center'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      { path: '/', element: <Schedule /> },
      { path: '/support', element: <Support /> },
      { path: '/profile', element: <Profile /> },
    ],
  },

  {
    path: '/login',
    element: <SignIn />,
  },

  {
    path: '/admin',
    element: <AdminPage />,
  },

  {
    path: '/coordination',
    element: <CoordinationLayout />,
    children: [
      { path: '/coordination/:supportCenterId', element: <CoordinationPage /> },
      { path: '/coordination/select', element: <SelectSupportCenter /> },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
])
