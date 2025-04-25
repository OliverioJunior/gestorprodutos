import { DomainError } from "./DomainError";

export class CategoryNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Categoria com ID ${id} não foi encontrada`);
  }
}

export class DuplicateCategoryError extends DomainError {
  constructor(nome: string) {
    super(`Já existe uma categoria com o nome: ${nome}`);
  }
}

export class CategoryWithProductsError extends DomainError {
  constructor(id: number) {
    super(
      `Não é possível excluir a categoria ${id} pois ela possui produtos associados`
    );
  }
}
