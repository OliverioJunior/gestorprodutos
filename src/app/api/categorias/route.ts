import { NextResponse } from "next/server";
import { CategoriaUseCases } from "../../../application/useCases/categoria/CategoriaUseCases";
import { PrismaCategoriaRepository } from "../../../infrastructure/repositories/PrismaCategoriaRepository";

const categoriaRepository = new PrismaCategoriaRepository();
const categoriaUseCases = new CategoriaUseCases(categoriaRepository);

// GET /api/categorias - Listar todas as categorias
export async function GET() {
  try {
    const categorias = await categoriaUseCases.listarCategorias();
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

// POST /api/categorias - Criar nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome } = body;

    const categoria = await categoriaUseCases.criarCategoria(nome);
    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    if (error.message === "Já existe uma categoria com este nome") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
