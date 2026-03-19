import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'

export default async function RootPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  switch (session.role) {
    case 'admin':
    case 'gerente':
      redirect('/admin')
    case 'garcom':
      redirect('/garcom')
    case 'cozinheiro':
      redirect('/cozinha')
    default:
      redirect('/login')
  }
}
