import type { Role } from '@/lib/constants/roles'

export interface SessionPayload {
  userId: string
  role: Role
  nome: string
}

export interface LoginCredentials {
  cpf: string
  senha: string
}

export interface AuthResult {
  success: boolean
  error?: string
  user?: {
    id: string
    nome: string
    role: Role
  }
}
