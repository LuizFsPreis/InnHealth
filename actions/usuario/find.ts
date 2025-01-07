'use server'

import { db } from '@/lib/db'
import { Prisma, Usuario } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.UsuarioWhereUniqueInput, 'id' | 'email'>
}): Promise<{
  data: Usuario | null
}> => {
  const user = await db.usuario.findUnique({
    where: where as Prisma.UsuarioWhereUniqueInput,
  })

  return { data: user }
}
