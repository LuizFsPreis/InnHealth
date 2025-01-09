'use server'

import { db } from '@/lib/db'
import { Prisma, Academia } from '@prisma/client'

export const findAction = async ({
  where,
}: {
  where: Pick<Prisma.AcademiaWhereUniqueInput, 'id'>
}): Promise<{
  data: Academia | null
}> => {
  const academia = await db.academia.findUnique({
    where: where as Prisma.AcademiaWhereUniqueInput,
  })

  return { data: academia }
}
