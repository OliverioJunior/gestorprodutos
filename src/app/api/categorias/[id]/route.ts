import { NextResponse } from "next/server";
import { CategoriaUseCases } from "../../../../application/useCases/categoria/CategoriaUseCases";
import { PrismaCategoriaRepository } from "../../../../infrastructure/repositories/PrismaCategoriaRepository";

const categoriaRepository = new PrismaCategoriaRepository();
const categoriaUseCases = new CategoriaUseCases(categoriaRepository);

// GET /api/categorias/[id] - Buscar categoria específica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const categoria = await categoriaUseCases.buscarCategoriaPorId(id);
    return NextResponse.json(categoria);
  } catch (error) {
    if (error.message === "Categoria não encontrada") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Erro ao buscar categoria" },
      { status: 500 }
    );
  }
}

// PUT /api/categorias/[id] - Atualizar categoria
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { nome } = body;

    const categoria = await categoriaUseCases.atualizarCategoria(id, nome);
    return NextResponse.json(categoria);
  } catch (error) {
    if (error.message === "Categoria não encontrada") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.message === "Já existe uma categoria com este nome") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar categoria" },
      { status: 500 }
    );
  }
}

// DELETE /api/categorias/[id] - Deletar categoria
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await categoriaUseCases.deletarCategoria(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.message === "Categoria não encontrada") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (
      error.message ===
      "Não é possível deletar uma categoria que possui produtos"
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "Erro ao deletar categoria" },
      { status: 500 }
    );
  }
}
