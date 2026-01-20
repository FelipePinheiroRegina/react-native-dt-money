import type { User } from './user'

export interface AuthenticateResponse {
  user: User
  token: string
}
