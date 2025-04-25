import { PrismaClient } from "@prisma/client";
import { Categoria } from "@/domain/categoria/Categoria";
import { ICategoriaRepository } from "@/domain/categoria/ICategoriaRepository";
import { prisma } from "../database/prisma";

export class PrismaCategoriaRepository implements ICategoriaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.prisma.categoria.findMany();
    return categorias.map((c) => new Categoria(c.nome, c.id));
  }

  async findById(id: string): Promise<Categoria | null> {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });
    return categoria ? new Categoria(categoria.nome, categoria.id) : null;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    const created = await this.prisma.categoria.create({
      data: {
        nome: categoria.nome,
      },
    });
    return new Categoria(created.nome, created.id);
  }

  async update(id: string, categoria: Categoria): Promise<Categoria> {
    const updated = await this.prisma.categoria.update({
      where: { id },
      data: {
        nome: categoria.nome,
      },
    });
    return new Categoria(updated.nome, updated.id);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.categoria.delete({
      where: { id },
    });
  }

  async existsWithName(nome: string): Promise<boolean> {
    const categoria = await this.prisma.categoria.findFirst({
      where: { nome },
    });
    return !!categoria;
  }
}
