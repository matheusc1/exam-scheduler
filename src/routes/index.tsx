import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/student/schedule'
import { Support } from '../pages/student/support'
import { Profile } from '../pages/student/profile'
import { SignIn } from '../pages/auth'
import { StudentLayout } from '../pages/_layouts/student-layout'
import { CoordinationLayout } from '../pages/_layouts/coordination-layout'
import { SupportCenter } from '@/pages/admin/support-center'
import { CoordinationPage } from '@/pages/coordination'
import { SelectSupportCenter } from '@/pages/coordination/select-support-center'
import { AdminLayout } from '@/pages/_layouts/admin-layout'
import { OperatingHours } from '@/pages/admin/operating-hours'
import { AdmSelectSupportCenter } from '@/pages/admin/components/select-support-center'
import { AvailableDates } from '@/pages/admin/available-dates'
import { Periods } from '@/pages/admin/periods'
import { Disciplines } from '@/pages/admin/disciplines'

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
    element: <AdminLayout />,
    children: [
      { path: '/admin/support-center', element: <SupportCenter /> },
      {
        path: '/admin/operating-hours',
        element: <AdmSelectSupportCenter path="operating-hours" />,
      },
      {
        path: '/admin/operating-hours/:supportCenterId',
        element: <OperatingHours />,
      },
      {
        path: '/admin/available-dates',
        element: <AdmSelectSupportCenter path="available-dates" />,
      },
      {
        path: '/admin/available-dates/:supportCenterId',
        element: <AvailableDates />,
      },
      { path: '/admin/periods', element: <Periods /> },
      { path: '/admin/disciplines', element: <Disciplines /> },
      { path: '/admin/students' },
      { path: '/admin/enrollments' },
      { path: '/admin/schedules' },
    ],
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
