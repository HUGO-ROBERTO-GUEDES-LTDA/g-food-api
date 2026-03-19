import type { Metadata } from 'next'
import { UtensilsCrossed } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = {
  title: 'Login | Gabriels PDVs',
  description: 'Acesse o sistema de PDV do restaurante.',
}

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <UtensilsCrossed className="size-6" />
        </div>
        <CardTitle className="text-2xl">Gabriels PDVs</CardTitle>
        <CardDescription>
          Digite seu CPF para acessar o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
