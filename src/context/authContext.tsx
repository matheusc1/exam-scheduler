import { api } from '@/lib/axios'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type UserRole = 'admin' | 'coordinator' | 'student' | null

interface AuthContextType {
  role: UserRole
  userId: string
  isAuthenticated: boolean
  isLoading: boolean
  login: (role: UserRole, id: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null)
  const [userId, setUserId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function verifyToken() {
      try {
        const { data } = await api.get('/verify-token')
        setIsAuthenticated(true)
        setRole(data.user.role)
        setUserId(data.user.id)
      } catch (error) {
        setIsAuthenticated(false)
        setRole(null)
        setUserId('')
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [])

  const login = (role: UserRole, id: string) => {
    setRole(role)
    setUserId(id)
    setIsAuthenticated(true)
  }

  const logout = () => {
    api.post('/logout').then(() => {
      setIsAuthenticated(false)
      setRole(null)
      setUserId('')
    })
  }

  return (
    <AuthContext.Provider
      value={{ role, userId, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook para usar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
