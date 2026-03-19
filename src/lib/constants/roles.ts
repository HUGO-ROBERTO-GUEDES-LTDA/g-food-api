export const ROLES = {
  ADMIN: 'admin',
  GERENTE: 'gerente',
  GARCOM: 'garcom',
  COZINHEIRO: 'cozinheiro',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrador',
  gerente: 'Gerente',
  garcom: 'Garçom',
  cozinheiro: 'Cozinheiro',
}

export const ADMIN_ROLES: Role[] = [ROLES.ADMIN, ROLES.GERENTE]
export const ALL_ROLES: Role[] = Object.values(ROLES)
