'use server'
import { db } from '@/lib/db'
import { dashboardRoute } from '@/lib/routes'
import { ActionState, safeAction } from '@/lib/safe-action'
import { Usuario } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UpdTipoUserSchema } from './schema'

type InputType = z.infer<typeof UpdTipoUserSchema>
type ReturnType = ActionState<InputType, Usuario>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, papel} = data

  let user

  try {
    const existingUser = await db.usuario.findUnique({ where: { id } })

    if (!existingUser) return { error: 'Usuário não encontrado' }

    user = await db.usuario.update({
      where: { id },
      data: { papel },
    })
  } catch {
    return { error: 'Ocorreu um erro ao atualizar, tente novamente mais tarde' }
  }

  revalidatePath(dashboardRoute)

  return { data: user }
}

export const updatePapelAction = safeAction(UpdTipoUserSchema, handler)
