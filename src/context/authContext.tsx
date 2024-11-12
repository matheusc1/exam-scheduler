import { api } from '@/lib/axios'
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
  supportCenter: string
}

interface AuthContextType {
  student: StudentType
  role: UserRole
  userId: string
  isAuthenticated: boolean
  isLoading: boolean
  login: (role: UserRole, id: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [student, setStudent] = useState<StudentType>({
    id: '',
    ra: '',
    name: '',
    email: '',
    birthDate: '',
    supportCenter: '',
  })
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

  useEffect(() => {
    async function getStudent() {
      if (userId) {
        const { data } = await api.get(`/students/${userId}`)
        setStudent({
          id: data.id,
          ra: data.ra,
          name: data.name,
          email: data.email,
          birthDate: data.birthDate,
          supportCenter: data.supportCenter,
        })
      }
    }

    if (userId) {
      getStudent()
    }
  }, [userId])

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
      value={{
        student,
        role,
        userId,
        isAuthenticated,
        isLoading,
        login,
        logout,
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
