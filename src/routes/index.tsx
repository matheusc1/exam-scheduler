import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/schedule'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [{ path: '/', element: <Schedule /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
