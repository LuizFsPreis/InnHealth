
import { action } from "@/actions";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const id = searchParams.get("id");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  
  if(!id) return NextResponse.json({ error: "Parametro 'id' é necessário!" }, { status: 400 });

  const where: Prisma.CheckinWhereInput = {usuarioId: id};

  try {
    const result = await action.checking().finByUser(page, limit, where);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}
