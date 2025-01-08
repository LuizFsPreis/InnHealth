'use server'

import { hashPassword } from '@/lib/auth/hash'
import { db } from '@/lib/db'
import { dashboardRoute } from '@/lib/routes'
import { ActionState, safeAction } from '@/lib/safe-action'
import { Academia } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { AcademiaSchema } from './schema'

type InputType = z.infer<typeof AcademiaSchema>
type ReturnType = ActionState<InputType, Academia>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { nome, descricao, latitude, longitude, telefone} = data

  let academia

  try {
    academia = await db.academia.create({
      data: { nome, descricao, latitude, longitude, telefone},
    })
  } catch(err) {
    return { error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}` }
  }

  revalidatePath(dashboardRoute)

  return { data: academia }
}

export const createAction = safeAction(AcademiaSchema, handler)
