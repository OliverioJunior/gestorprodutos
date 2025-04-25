import { Categoria } from "../../../domain/categoria/Categoria";
import { ICategoriaRepository } from "../../../domain/categoria/ICategoriaRepository";

export class CategoriaUseCases {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async listarCategorias(): Promise<Categoria[]> {
    return await this.categoriaRepository.findAll();
  }

  async buscarCategoriaPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  }

  async criarCategoria(nome: string): Promise<Categoria> {
    const existente = await this.categoriaRepository.existsWithName(nome);
    if (existente) {
      throw new Error("Já existe uma categoria com este nome");
    }

    const categoria = new Categoria(nome);
    return await this.categoriaRepository.create(categoria);
  }

  async atualizarCategoria(id: number, nome: string): Promise<Categoria> {
    const categoriaExistente = await this.categoriaRepository.findById(id);
    if (!categoriaExistente) {
      throw new Error("Categoria não encontrada");
    }

    const existeNome = await this.categoriaRepository.existsWithName(nome);
    if (existeNome && categoriaExistente.nome !== nome) {
      throw new Error("Já existe uma categoria com este nome");
    }

    categoriaExistente.atualizarNome(nome);
    return await this.categoriaRepository.update(id, categoriaExistente);
  }

  async deletarCategoria(id: number): Promise<void> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    try {
      await this.categoriaRepository.delete(id);
    } catch (error) {
      if (typeof error   error.code === "P2003") {
        throw new Error(
          "Não é possível deletar uma categoria que possui produtos"
        );
      }
      throw error;
    }
  }
}
