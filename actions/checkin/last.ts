"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const findLastCheckinByUser = async (
  where: Pick<Prisma.CheckinWhereInput, 'usuarioId'>
) => {
  const lastCheckin = await db.checkin.findFirst({
    where,
    orderBy: {
      data: 'desc',
    }
  });

  return lastCheckin;
};
