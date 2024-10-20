import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/toaster'

export function App() {
  return (
    <ThemeProvider>
      <div className="max-w-4xl mx-auto antialiased px-2 sm:px-0">
        <Toaster />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )
}
