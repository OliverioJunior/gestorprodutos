import { DomainError } from "./DomainError";

export class ProductNotFoundError extends DomainError {
  constructor(id: number) {
    super(`Produto com ID ${id} não foi encontrado`);
  }
}

export class InvalidProductDataError extends DomainError {
  constructor(message: string) {
    super(`Dados do produto inválidos: ${message}`);
  }
}

export class DuplicateProductError extends DomainError {
  constructor(nome: string) {
    super(`Já existe um produto com o nome: ${nome}`);
  }
}
