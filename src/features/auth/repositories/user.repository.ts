import { createAdminClient } from '@/lib/supabase/admin'
import type { Usuario } from '@/types/database'

const supabase = createAdminClient()

export async function findUsuarioByCpf(cpf: string): Promise<Usuario | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('cpf', cpf)
    .eq('ativo', true)
    .single()

  if (error) return null
  return data
}

export async function findUsuarioById(id: string): Promise<Usuario | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function listUsuariosByRestaurante(
  restauranteId: string
): Promise<Usuario[]> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('restaurante_id', restauranteId)
    .order('nome')

  if (error) return []
  return data
}

export async function createUsuario(
  restauranteId: string,
  nome: string,
  cpf: string,
  role: string,
  senhaHash: string
): Promise<Usuario | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .insert({
      restaurante_id: restauranteId,
      nome,
      cpf,
      role,
      senha_hash: senhaHash,
    })
    .select()
    .single()

  if (error) return null
  return data
}

export async function updateUsuario(
  id: string,
  updates: Partial<Pick<Usuario, 'nome' | 'role' | 'ativo'>>
): Promise<Usuario | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return null
  return data
}

export async function updateSenha(
  id: string,
  senhaHash: string
): Promise<boolean> {
  const { error } = await supabase
    .from('usuarios')
    .update({ senha_hash: senhaHash, updated_at: new Date().toISOString() })
    .eq('id', id)

  return !error
}
