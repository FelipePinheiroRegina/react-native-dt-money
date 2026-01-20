import type { RegisterFormSchema } from '@/pages/Register/RegisterForm/schema'
import { api } from '@/shared/api/dt-money'
import type { RegisterResponse } from '@/shared/interfaces/https/register-response'

export async function register(params: RegisterFormSchema) {
  const { name, email, password } = params
  const response = await api.post<RegisterResponse>('/auth/register', {
    name,
    email,
    password,
  })

  return response.data
}
