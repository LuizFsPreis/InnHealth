'use server'

import { hashPassword } from '@/lib/auth/hash'
import { db } from '@/lib/db'
import { dashboardRoute } from '@/lib/routes'
import { ActionState, safeAction } from '@/lib/safe-action'
import { Usuario } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UsuarioSchema } from './schema'

type InputType = z.infer<typeof UsuarioSchema>
type ReturnType = ActionState<InputType, Usuario>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { nome, email, senha } = data

  let user

  try {
    if (await db.usuario.findUnique({ where: { email } }))
      return { error: 'E-mail já cadastrado' }

    user = await db.usuario.create({
      data: { nome, email, senha: await hashPassword(senha)},
    })
  } catch(err) {
    return { error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}` }
  }

  revalidatePath(dashboardRoute)

  return { data: user }
}

export const createAction = safeAction(UsuarioSchema, handler)
