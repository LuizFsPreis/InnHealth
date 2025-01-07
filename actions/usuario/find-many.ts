'use server'

import { db } from '@/lib/db';
import { Prisma, Usuario } from '@prisma/client';

export const findManyAction = async ({
  where,
}: {
  where?: Pick<Prisma.UsuarioWhereInput, 'id' | 'email'>;
}): Promise<{
  data: Usuario[];
}> => {
  const users = await db.usuario.findMany({
    where,
    orderBy: { nome: 'asc' },
  });

  return { data: users };
};
