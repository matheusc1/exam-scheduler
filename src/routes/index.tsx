import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/student/schedule'
import { Support } from '../pages/student/support'
import { Profile } from '../pages/student/profile'
import { SignIn } from '../pages/auth'
import { Layout } from '../pages/student/_layout'
import { AdminPage } from '@/pages/admin'
import { CoordinationPage } from '@/pages/coordination'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    element: <CoordinationPage />,
  },

  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
])
