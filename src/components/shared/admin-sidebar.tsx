'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  DollarSign,
  Grid3x3,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Caixa', href: '/caixa', icon: DollarSign },
  { label: 'Mesas', href: '/mesas', icon: Grid3x3 },
  { label: 'Pedidos', href: '/pedidos', icon: ClipboardList },
  { label: 'Cardapio', href: '/cardapio', icon: BookOpen },
  { label: 'Estoque', href: '/estoque', icon: Package },
  { label: 'Financeiro', href: '/financeiro', icon: BarChart3 },
  { label: 'Configuracoes', href: '/configuracoes', icon: Settings },
]

function isActiveLink(pathname: string, href: string): boolean {
  if (href === '/admin') {
    return pathname === '/admin'
  }
  return pathname.startsWith(href)
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = isActiveLink(pathname, item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <LayoutDashboard className="size-4" />
      </div>
      <span className="text-lg font-bold tracking-tight">Gabriels PDVs</span>
    </div>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b px-4">
          <SidebarLogo />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks pathname={pathname} />
        </div>
      </aside>

      {/* Mobile menu trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b px-4 py-4">
            <SheetTitle>
              <SidebarLogo />
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="p-4">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
