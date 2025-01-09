
import { action } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  
  // Exemplo de filtro: adaptável ao que você precisa
  const where = {}; // Construa sua condição `where` aqui com base em query params

  try {
    const result = await action.checking().findMany(page, limit, where);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
