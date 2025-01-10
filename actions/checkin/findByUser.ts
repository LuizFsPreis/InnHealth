"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const finByUserAction = async (
  page = 1,
  limit = 20,
  where: Pick<Prisma.CheckinWhereInput, 'usuarioId'>
) => {
  const skip = (page - 1) * limit;

  const checkins = await db.checkin.findMany({
    where,
    skip,
    take: limit,
    include: {
      academia: {
        select: {
          nome: true,
        },
      },
    },
  });

  const totalCount = await db.checkin.count();

  return { checkins, totalCount };
};
