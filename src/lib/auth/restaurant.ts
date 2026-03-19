import { createAdminClient } from '@/lib/supabase/admin'
import type { Restaurante } from '@/types/database'

let cachedRestaurante: Restaurante | null = null

/**
 * Retorna o restaurante da instancia (single-tenant).
 * A aplicacao sempre tem exatamente 1 restaurante.
 * O resultado e cacheado em memoria para evitar queries repetidas.
 */
export async function getRestaurante(): Promise<Restaurante> {
  if (cachedRestaurante) return cachedRestaurante

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('restaurantes')
    .select('*')
    .limit(1)
    .single()

  if (error || !data) {
    throw new Error('Restaurante não configurado. Execute o seed do banco de dados.')
  }

  cachedRestaurante = data
  return data
}

export async function getRestauranteId(): Promise<string> {
  const restaurante = await getRestaurante()
  return restaurante.id
}

/**
 * Limpa o cache do restaurante (usar apos atualizar config)
 */
export function clearRestauranteCache(): void {
  cachedRestaurante = null
}
