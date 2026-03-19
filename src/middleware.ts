import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production-min-32'
)

const SESSION_COOKIE = 'pdv-session'

// Rotas que nao precisam de autenticacao
const PUBLIC_ROUTES = ['/login', '/cardapio', '/carrinho', '/finalizar', '/acompanhamento']

// Mapeamento de rotas para roles permitidos
const ROUTE_ROLES: Record<string, string[]> = {
  '/admin': ['admin', 'gerente'],
  '/caixa': ['admin', 'gerente'],
  '/mesas': ['admin', 'gerente'],
  '/pedidos': ['admin', 'gerente'],
  '/cardapio-admin': ['admin', 'gerente'],
  '/estoque': ['admin', 'gerente'],
  '/financeiro': ['admin', 'gerente'],
  '/configuracoes': ['admin', 'gerente'],
  '/garcom': ['admin', 'gerente', 'garcom'],
  '/mesa': ['admin', 'gerente', 'garcom'],
  '/pedido-direto': ['admin', 'gerente', 'garcom'],
  '/meus-pedidos': ['admin', 'gerente', 'garcom'],
  '/cozinha': ['admin', 'gerente', 'cozinheiro'],
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
}

function getRequiredRoles(pathname: string): string[] | null {
  for (const [route, roles] of Object.entries(ROUTE_ROLES)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return roles
    }
  }
  return null
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas publicas - liberar acesso
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Verificar sessao
  const token = request.cookies.get(SESSION_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userRole = payload.role as string

    // Verificar role para a rota
    const requiredRoles = getRequiredRoles(pathname)
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      // Redirecionar para rota adequada do role
      const redirectPath = getDefaultRoute(userRole)
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }

    // Adicionar headers com dados do usuario
    const response = NextResponse.next()
    response.headers.set('x-user-id', payload.userId as string)
    response.headers.set('x-user-role', userRole)

    return response
  } catch {
    // Token invalido - redirecionar para login
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(SESSION_COOKIE)
    return response
  }
}

function getDefaultRoute(role: string): string {
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

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
