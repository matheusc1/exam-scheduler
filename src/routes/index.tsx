import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/schedule'
import { Support } from '../pages/support'
import { Profile } from '../pages/profile'
import { SignIn } from '../pages/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
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
    path: '*',
    element: <NotFound />,
  },
])
