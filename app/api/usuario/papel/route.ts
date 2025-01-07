import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
      if (!body.id) {
        return NextResponse.json({ error: "ID de usuário não fornecido" }, { status: 400 });
      }
      
      if(!body.papel){
        return NextResponse.json({ error: "Papel de usuário não fornecido" }, { status: 400 });
      }
      
      const updatedUser = await db.usuario.update({
        where: { id: String(body.id) },
        data: {
          papel: body.papel,
        },
      });
  
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
  }
  