import { action } from "@/actions";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "20");
  const nome = params.get("param");

  try {
    const where: Prisma.AcademiaWhereInput = nome
      ? {
          nome: {
            contains: nome,
            mode: "insensitive",
          },
        }
      : {};

    const data = await action.academia().findMany(page, limit, where);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar academias" },
      { status: 400 }
    );
  }
}
