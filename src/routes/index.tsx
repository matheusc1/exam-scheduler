import { createBrowserRouter } from 'react-router-dom'
import { Error } from '../pages/error'
import { NotFound } from '../pages/404'
import { Schedule } from '../pages/schedule'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    children: [
      { path: '/', element: <Schedule /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
