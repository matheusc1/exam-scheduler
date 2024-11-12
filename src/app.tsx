import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './context/authContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
