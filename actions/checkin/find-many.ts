"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const findManyAction = async (
  page = 1,
  limit = 20,
  where: Prisma.CheckinWhereInput
) => {
  const skip = (page - 1) * limit;

  const checkins = await db.checkin.findMany({
    where,
    skip,
    take: limit,
    orderBy: { data: "desc" },
  });

  const totalCount = await db.checkin.count({ where });

  return { checkins, totalCount };
};
