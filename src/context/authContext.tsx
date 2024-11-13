import { logout } from '@/http/auth/logout'
import { verifyToken } from '@/http/auth/verify-token'
import { getStudent } from '@/http/student/get-student'
import { useQuery } from '@tanstack/react-query'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type UserRole = 'admin' | 'coordinator' | 'student' | null

export interface StudentType {
  id: string
  ra: string
  name: string
  email: string
  birthDate: string
  supportCenter: {
    id: string
    name: string
  }
}

interface AuthContextType {
  student: StudentType | undefined
  role: UserRole
  userId: string
  isAuthenticated: boolean
  isLoading: boolean
  login: (role: UserRole, id: string) => void
  logoutFn: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null)
  const [userId, setUserId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function validateToken() {
      try {
        const { role, id } = await verifyToken()
        setIsAuthenticated(true)
        setRole(role)
        setUserId(id)
      } catch (error) {
        setIsAuthenticated(false)
        setRole(null)
        setUserId('')
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [])

  const { data: student } = useQuery<StudentType>({
    queryKey: ['get-student'],
    queryFn: () => getStudent({ userId }),
    enabled: !!userId,
    staleTime: Number.POSITIVE_INFINITY,
  })

  if (!student) return

  const login = (role: UserRole, id: string) => {
    setRole(role)
    setUserId(id)
    setIsAuthenticated(true)
  }

  const logoutFn = async () => {
    await logout().then(() => {
      setIsAuthenticated(false)
      setRole(null)
      setUserId('')
    })
  }

  return (
    <AuthContext.Provider
      value={{
        student,
        role,
        userId,
        isAuthenticated,
        isLoading,
        login,
        logoutFn,
      }}
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
