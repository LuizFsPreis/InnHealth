'use client'

import { cn } from '@/lib/utlis'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ForgotPasswordForm = () => {
  const [warn, setWarn] = useState<string>()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
  })

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    setWarn(undefined)

    const validatedFields = Schema.safeParse(data)

    if (validatedFields.success) {
      setWarn('E-mail enviado com sucesso.')
    } else setWarn('Preencha o campo corretamente.')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      {warn && (
        <span className="rounded bg-alternate p-2">
          <InfoIcon className="me-2 inline size-4" />
          {warn}
        </span>
      )}

      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="font-bold uppercase">
          E-mail
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="rounded bg-alternate p-2"
          maxLength={50}
          disabled={loading}
        />
        {errors.email && (
          <span className="text-sm">{errors.email.message}</span>
        )}
      </div>

      <button
        type="submit"
        className={cn(
          'rounded-md px-4 py-2 font-bold uppercase duration-300',
          loading ? 'bg-alternate' : 'bg-primary text-alternate',
        )}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Enviar'}
      </button>
    </form>
  )
}

const Schema = z.object({
  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail é inválido',
    }),
})
