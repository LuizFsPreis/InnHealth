'use server'

import { db } from '@/lib/db'
import { dashboardRoute } from '@/lib/routes'
import { ActionState, safeAction } from '@/lib/safe-action'
import { Checkin } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { checkinSchema } from './schema'

type InputType = z.infer<typeof checkinSchema>
type ReturnType = ActionState<InputType, Checkin>

const handler = async (data: InputType): Promise<ReturnType> => {
  const { academiaId, usuarioId, nomeAcademia} = data

  let academia

  try {
    academia = await db.checkin.create({
      data: { academiaId, usuarioId, nomeAcademia},
    })
  } catch(err) {
    return { error: `Ocorreu um erro ao criar, tente novamente mais tarde ${err}` }
  }

  revalidatePath(dashboardRoute)

  return { data: academia }
}

export const createAction = safeAction(checkinSchema, handler)
