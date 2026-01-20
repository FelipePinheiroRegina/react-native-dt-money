import type { LoginFormSchema } from '@/pages/Login/LoginForm/schema'
import { api } from '@/shared/api/dt-money'
import type { AuthenticateResponse } from '@/shared/interfaces/https/auth-response'

export async function authenticate(params: LoginFormSchema) {
  const response = await api.post<AuthenticateResponse>('/auth/login', params)

  return response.data
}
