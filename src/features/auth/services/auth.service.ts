import { compare, hash } from 'bcryptjs'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestauranteId } from '@/lib/auth/restaurant'
import type { AuthResult } from '../types'

const SALT_ROUNDS = 10

export async function authenticateUser(
  cpf: string,
  senha: string
): Promise<AuthResult> {
  const supabase = createAdminClient()

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('id, nome, cpf, role, senha_hash, ativo')
    .eq('cpf', cpf)
    .eq('ativo', true)
    .single()

  if (error || !usuario) {
    return { success: false, error: 'CPF ou senha inválidos' }
  }

  const senhaValida = await compare(senha, usuario.senha_hash)
  if (!senhaValida) {
    return { success: false, error: 'CPF ou senha inválidos' }
  }

  return {
    success: true,
    user: {
      id: usuario.id,
      nome: usuario.nome,
      role: usuario.role,
    },
  }
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS)
}

export async function checkCaixaAberto(): Promise<boolean> {
  const supabase = createAdminClient()
  const restauranteId = await getRestauranteId()

  const { data } = await supabase
    .from('caixas')
    .select('id')
    .eq('restaurante_id', restauranteId)
    .eq('status', 'aberto')
    .limit(1)
    .single()

  return !!data
}

export async function getCaixaAberto() {
  const supabase = createAdminClient()
  const restauranteId = await getRestauranteId()

  const { data } = await supabase
    .from('caixas')
    .select('*')
    .eq('restaurante_id', restauranteId)
    .eq('status', 'aberto')
    .limit(1)
    .single()

  return data
}
