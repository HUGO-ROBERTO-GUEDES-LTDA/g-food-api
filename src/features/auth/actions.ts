'use server'

import { redirect } from 'next/navigation'
import { authenticateUser, checkCaixaAberto, hashPassword } from './services/auth.service'
import { createSession, destroySession } from '@/lib/auth/session'
import { loginSchema, createUsuarioSchema } from './schemas'
import { getRestauranteId } from '@/lib/auth/restaurant'
import { requireAdmin } from '@/lib/auth/guards'
import { createUsuario as createUsuarioRepo } from './repositories/user.repository'

export interface LoginState {
  error?: string
  success?: boolean
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const raw = {
    cpf: formData.get('cpf') as string,
    senha: formData.get('senha') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: 'Dados inválidos. Verifique o CPF e a senha.' }
  }

  const { cpf, senha } = parsed.data
  const result = await authenticateUser(cpf, senha)

  if (!result.success || !result.user) {
    return { error: result.error || 'Erro ao autenticar' }
  }

  // Se for garcom, verificar se o caixa esta aberto
  if (result.user.role === 'garcom') {
    const caixaAberto = await checkCaixaAberto()
    if (!caixaAberto) {
      return { error: 'O caixa não está aberto. Solicite ao gerente para abrir o caixa.' }
    }
  }

  await createSession({
    userId: result.user.id,
    role: result.user.role,
    nome: result.user.nome,
  })

  // Redirecionar baseado no role
  const redirectPath = getRedirectPath(result.user.role)
  redirect(redirectPath)
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect('/login')
}

export async function createUsuarioAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  await requireAdmin()

  const raw = {
    nome: formData.get('nome') as string,
    cpf: formData.get('cpf') as string,
    role: formData.get('role') as string,
  }

  const parsed = createUsuarioSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: 'Dados inválidos. Verifique os campos.' }
  }

  const { nome, cpf, role } = parsed.data
  const restauranteId = await getRestauranteId()

  // Senha padrao = CPF (o usuario usa o CPF como senha)
  const senhaHash = await hashPassword(cpf)

  const usuario = await createUsuarioRepo(restauranteId, nome, cpf, role, senhaHash)

  if (!usuario) {
    return { error: 'Erro ao criar usuário. CPF pode já estar cadastrado.' }
  }

  return { success: true }
}

function getRedirectPath(role: string): string {
  switch (role) {
    case 'admin':
    case 'gerente':
      return '/admin'
    case 'garcom':
      return '/garcom'
    case 'cozinheiro':
      return '/cozinha'
    default:
      return '/login'
  }
}
