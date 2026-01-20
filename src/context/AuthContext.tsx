import type { LoginFormSchema } from '@/pages/Login/LoginForm/schema'
import type { RegisterFormSchema } from '@/pages/Register/RegisterForm/schema'
import type { AuthenticateResponse } from '@/shared/interfaces/https/auth-response'
import type { User } from '@/shared/interfaces/https/user'
import { authenticate } from '@/shared/services/dt-money/authenticate'
import { register } from '@/shared/services/dt-money/register'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useState } from 'react'

type AuthContextType = {
  user: User | null
  token: string | null
  handleAuthenticate: (params: LoginFormSchema) => Promise<void>
  handleRegister: (params: RegisterFormSchema) => Promise<void>
  handleLogout: () => Promise<void>
  restoreUserSession: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const STORAGE_KEY = 'dt-money:auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  function saveUserAndToken(user: User, token: string) {
    setUser(user)
    setToken(token)
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
  }

  async function handleAuthenticate(params: LoginFormSchema) {
    const response = await authenticate(params)
    saveUserAndToken(response.user, response.token)
  }

  async function handleRegister(params: RegisterFormSchema) {
    const response = await register(params)
    saveUserAndToken(response.user, response.token)
  }

  async function handleLogout() {
    setUser(null)
    setToken(null)
    await AsyncStorage.removeItem(STORAGE_KEY)
  }

  async function restoreUserSession() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)

    if (storage) {
      const { user, token } = JSON.parse(storage) as AuthenticateResponse
      setUser(user)
      setToken(token)
    }

    return storage
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
