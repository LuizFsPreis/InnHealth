"use server";

import { db } from "@/lib/db";

export const findManyAction = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const academias = await db.academia.findMany({
    skip,
    take: limit,
    orderBy: { id: 'asc' }, 
  });

  const totalCount = await db.academia.count();

  return { academias, totalCount };
};
