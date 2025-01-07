'use client'

import { action } from '@/actions'
import {
  UsuarioSchema,
  UsuarioUpdateSchema,
  UsuarioUpsertSchema,
} from '@/actions/usuario/schema'
import { useAction } from '@/hooks/use-action'
import { dashboardRoute } from '@/lib/routes'
import { cn } from '@/lib/utlis'
import { zodResolver } from '@hookform/resolvers/zod'
import { Usuario } from '@prisma/client'
import { ArrowLeftCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'

type _FieldErrors = FieldErrors<
  z.infer<typeof UsuarioSchema> & z.infer<typeof UsuarioUpdateSchema>
>

export const UserForm = ({ user }: { user?: Usuario }) => {
  const router = useRouter()

  const [warn, setWarn] = useState<string>()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
  } = useForm<z.infer<typeof UsuarioUpsertSchema>>({
    resolver: zodResolver(UsuarioUpsertSchema),
    defaultValues: {
      new: !user,
      id: user?.id,
      nome: user?.nome,
      email: user?.email,
    },
  })

  const { create, delete: del, update } = action.usuario()

  const { execute } = useAction(create, {
    onSuccess: ({ id }) => {
      setWarn('Usuário criado com sucesso.')
      router.push(`/auth/login`)
    },
    onError: setWarn,
  })

  const { execute: executeUpdate } = useAction(update, {
    onSuccess: () => setWarn('Usuário atualizado com sucesso.'),
    onError: setWarn,
  })

  const { execute: executeDelete } = useAction(del, {
    onSuccess: () => {
      setWarn('Usuário excluído com sucesso.')
      router.push(`${dashboardRoute}/usuarios`)
    },
    onError: setWarn,
  })

  const onSubmit = async (data: z.infer<typeof UsuarioUpsertSchema>) => {
    setWarn(undefined)

    if (user) await executeUpdate(UsuarioUpdateSchema.parse(data))
    else await execute(UsuarioSchema.parse(data))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex size-full flex-col gap-y-4"
    >
      <div className="sticky top-20 z-10 flex items-center justify-between gap-x-4 rounded bg-white p-2 shadow">
        <div className="text-xl font-bold uppercase">
          <Link href={`/`}>
            <ArrowLeftCircleIcon className="me-4 inline size-6" />
          </Link>
          {user ? 'Editar' : 'Criar'} Usuário
        </div>

        <div className="flex items-center gap-x-2 text-sm *:rounded">
          {warn && <span className="bg-alternate p-2">{warn}</span>}

          {user && (
            <button
              type="button"
              className={cn(
                'bg-primary p-2 font-bold uppercase',
                loading ? 'bg-alternate' : 'bg-primary text-alternate',
              )}
              onClick={async () => {
                if (confirm('Deseja realmente excluir este usuário?'))
                  await executeDelete({ where: { id: user.id } })
              }}
              disabled={loading}
            >
              Excluir
            </button>
          )}

          <button
            type="submit"
            className={cn(
              'bg-primary p-2 font-bold uppercase',
              loading ? 'bg-alternate' : 'bg-primary text-alternate',
            )}
            disabled={loading}
          >
            {loading ? 'Salvando...' : user ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="nome" className="font-bold">
          Nome
        </label>
        <input
          {...register('nome')}
          id="nome"
          type="text"
          className="rounded bg-alternate/20 p-2"
          disabled={loading}
        />
        {errors.nome && <span className="text-sm">{errors.nome.message}</span>}
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="font-bold">
          E-mail
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="rounded bg-alternate/20 p-2"
          disabled={loading}
        />
        {errors.email && (
          <span className="text-sm">{errors.email.message}</span>
        )}
      </div>

      {user ? (
        <div className="flex flex-col gap-y-2">
          <label htmlFor="novaSenha" className="font-bold">
            Nova Senha
          </label>
          <input
            {...register('novaSenha')}
            id="novaSenha"
            type="text"
            className="rounded bg-alternate/20 p-2"
            disabled={loading}
          />
          {(errors as _FieldErrors).novaSenha && (
            <span className="text-sm">
              {(errors as _FieldErrors).novaSenha?.message}
            </span>
          )}
          <span className="text-sm">
            Deixe em branco para manter a senha atual.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2">
          <label htmlFor="senha" className="font-bold">
            Senha
          </label>
          <input
            {...register('senha')}
            id="senha"
            type="text"
            className="rounded bg-alternate/20 p-2"
            disabled={loading}
          />
          {(errors as _FieldErrors).senha && (
            <span className="text-sm">
              {(errors as _FieldErrors).senha?.message}
            </span>
          )}
          <span className="text-sm">Digite uma senha para o novo usuário.</span>
        </div>
      )}

      <div className="flex flex-col gap-y-2">
      </div>
    </form>
  )
}
