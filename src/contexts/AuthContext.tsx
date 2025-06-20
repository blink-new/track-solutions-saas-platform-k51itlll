import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type UserRole = 'admin' | 'transport_company' | 'driver'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company_id?: string
  avatar_url?: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock authentication for now - will be replaced with Supabase later
  const login = async (email: string) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data based on email domain
    let mockUser: User
    
    if (email.includes('admin')) {
      mockUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: new Date().toISOString()
      }
    } else if (email.includes('transport')) {
      mockUser = {
        id: '2',
        email,
        name: 'Transport Manager',
        role: 'transport_company',
        company_id: 'company-1',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612c913?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: new Date().toISOString()
      }
    } else {
      mockUser = {
        id: '3',
        email,
        name: 'Driver User',
        role: 'driver',
        company_id: 'company-1',
        avatar_url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: new Date().toISOString()
      }
    }
    
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    // Check for stored user on app start
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      console.log("AuthContext: User found in localStorage", JSON.parse(storedUser));
    }
    setLoading(false)
    console.log("AuthContext: Initial loading finished, user is", storedUser ? "loaded" : "null");
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider