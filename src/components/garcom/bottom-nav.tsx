'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Grid3x3, PlusCircle, ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { href: '/garcom', label: 'Mesas', icon: Grid3x3 },
  { href: '/pedido-direto', label: 'Pedido Direto', icon: PlusCircle },
  { href: '/meus-pedidos', label: 'Meus Pedidos', icon: ClipboardList },
]

export function BottomNav(): React.ReactElement {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <ul className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  'flex min-h-[60px] flex-col items-center justify-center gap-1 px-2 py-2 text-xs transition-colors',
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="size-6" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
