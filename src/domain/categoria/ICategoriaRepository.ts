import { Categoria } from "./Categoria";

export interface ICategoriaRepository {
  findAll(): Promise<Categoria[]>;
  findById(id: string): Promise<Categoria | null>;
  create(categoria: Categoria): Promise<Categoria>;
  update(id: string, categoria: Categoria): Promise<Categoria>;
  delete(id: string): Promise<void>;
  existsWithName(nome: string): Promise<boolean>;
}
