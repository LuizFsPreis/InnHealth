import { action } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const usuarioId = searchParams.get("usuarioId");
  
  if (!usuarioId) {
    return NextResponse.json({ error: "Parametro 'usuarioId' é necessário!" }, { status: 400 });
  }

  try {
    const checkin = await action.checking().last({ usuarioId });

    if (!checkin) {
      return NextResponse.json({ error: "Nenhum check-in encontrado." }, { status: 404 });
    }

    const dataAtual = new Date();
    const dataCheckin = new Date(checkin.data);

    const isSameDay = (
      dataAtual.getFullYear() === dataCheckin.getFullYear() &&
      dataAtual.getMonth() === dataCheckin.getMonth() &&
      dataAtual.getDate() === dataCheckin.getDate()
    );

    if (isSameDay) {
      return NextResponse.json({ status: true });
    }
    
    return NextResponse.json({ status: false });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}
