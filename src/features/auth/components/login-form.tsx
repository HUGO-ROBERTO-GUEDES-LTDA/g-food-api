'use client'

import { useActionState, useCallback, useState, type ChangeEvent } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction, type LoginState } from '../actions'

function formatCpfInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Entrando...
        </>
      ) : (
        'Entrar'
      )}
    </Button>
  )
}

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState)
  const [senhaValue, setSenhaValue] = useState('')

  const handleCpfChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCpfInput(event.target.value)
      event.target.value = formatted

      const digits = formatted.replace(/\D/g, '')
      setSenhaValue(digits)
    },
    [],
  )

  return (
    <form action={formAction} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          name="cpf"
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          autoComplete="username"
          required
          maxLength={14}
          onChange={handleCpfChange}
        />
        <p className="text-xs text-muted-foreground">
          O CPF e a sua senha de acesso.
        </p>
      </div>

      <input type="hidden" name="senha" value={senhaValue} />

      {state.error && (
        <p className="text-sm font-medium text-destructive">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}
