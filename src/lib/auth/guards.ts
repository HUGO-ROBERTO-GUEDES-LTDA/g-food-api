import { redirect } from 'next/navigation'
import { getSession } from './session'
import type { Role } from '@/lib/constants/roles'
import type { SessionPayload } from '@/features/auth/types'

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return session
}

export async function requireRole(
  ...allowedRoles: Role[]
): Promise<SessionPayload> {
  const session = await requireAuth()

  if (!allowedRoles.includes(session.role)) {
    redirect('/login')
  }

  return session
}

export async function requireAdmin(): Promise<SessionPayload> {
  return requireRole('admin', 'gerente')
}

export async function requireGarcom(): Promise<SessionPayload> {
  return requireRole('admin', 'gerente', 'garcom')
}

export async function requireCozinha(): Promise<SessionPayload> {
  return requireRole('admin', 'gerente', 'cozinheiro')
}
