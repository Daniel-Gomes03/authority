import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext
} from 'react'
import router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from 'services/api'
import { ISignIn, ISignUp, IUser } from 'interfaces/authUser.interface'

type AuthContextType = {
  user?: IUser
  signIn: (args: ISignIn) => Promise<void>
  signUp: (args: ISignUp) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | undefined>()

  useEffect(() => {
    const { 'authority.user': authUser } = parseCookies()

    if (authUser) {
      setUser(JSON.parse(authUser))
    }
  }, [])

  const signIn = async ({ email, password }: ISignIn) => {
    const { data } = await api.post<IUser>('/api/users/signIn', {
      email,
      password
    })

    setCookie(undefined, 'authority.user', JSON.stringify(data), {
      maxAge: 60 * 60 * 1 // 1 hour
    })
    setUser(data as IUser)
    router.push('/welcome')
  }

  const signUp = async ({ name, email, password }: ISignUp) => {
    await api.post('/api/users', {
      name,
      email,
      password
    })
  }

  const signOut = () => {
    router.push('/signin')
    destroyCookie(undefined, 'authority.user')
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}

export { AuthProvider, useAuth }
