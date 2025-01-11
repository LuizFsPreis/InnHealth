"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const findManyAction = async (
  page = 1,
  limit = 20,
  where: Prisma.AcademiaWhereInput
) => {
  const skip = (page - 1) * limit;

  const academias = await db.academia.findMany({
    where,
    skip,
    take: limit,
    orderBy: { id: "asc" },
  });

  const totalCount = await db.academia.count({ where });

  return { academias, totalCount };
};
