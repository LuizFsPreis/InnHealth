import { action } from "@/actions";
import { checkinSchema } from "@/actions/checkin/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    

    // Realiza a validação com Zod
    const result = checkinSchema.safeParse(body);
    
    if (result.success) {
      action.checking().create(body)
      return NextResponse.json(body, { status: 200 });
    } else {

      return NextResponse.json(
        { message: "Dados inválidos", errors: result.error.format() },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json(
      { message: "Erro ao processar a requisição" },
      { status: 500 }
    );
  }
}
