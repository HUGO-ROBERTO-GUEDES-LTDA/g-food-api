import { z } from 'zod/v4'

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .transform((val) => val.replace(/\D/g, '')),
  senha: z
    .string()
    .min(1, 'Senha é obrigatória'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const createUsuarioSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido')
    .transform((val) => val.replace(/\D/g, '')),
  role: z.enum(['admin', 'gerente', 'garcom', 'cozinheiro']),
})

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>
