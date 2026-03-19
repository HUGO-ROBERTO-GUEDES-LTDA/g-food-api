import { cookies } from 'next/headers'
import { signToken, verifyToken } from '@/features/auth/services/jwt.service'
import type { SessionPayload } from '@/features/auth/types'

const SESSION_COOKIE = 'pdv-session'

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await signToken(payload)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 horas
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  return verifyToken(token)
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
