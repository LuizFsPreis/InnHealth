import { action } from "@/actions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Obtém os parâmetros de busca da URL
    const id = request.nextUrl.searchParams.get("id");

    console.log(id)
    if (!id) {
      return NextResponse.json({ error: "ID de usuário não fornecido" }, { status: 400 });
    }

    // Busca o usuário no banco de dados
    const user = await action.usuario().find({
      where: { id: id },
    });

    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// Método PUT para atualizar as informações de um usuário específico
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID de usuário não fornecido" }, { status: 400 });
    }

    // Pega o corpo da requisição (os dados que queremos atualizar)
    const body = await request.json();

    // Atualiza o usuário no banco de dados
    const updatedUser = await db.usuario.update({
      where: { id: String(id) },
      data: {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        papel: body.papel || null,
        cidade: body.cidade || null,
        curso: body.curso || null,
        sit: body.sit || null,
        sobre: body.sobre || null,
        userPerfilImage: body.userPerfilImage || null,
        userCapaImage: body.userCapaImage || null,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
