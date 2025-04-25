export class Categoria {
  private _id: string;
  private _nome: string;

  constructor(nome: string, id: string) {
    this.validarNome(nome);
    this._nome = nome;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  atualizarNome(novoNome: string): void {
    this.validarNome(novoNome);
    this._nome = novoNome;
  }

  private validarNome(nome: string): void {
    if (!nome || nome.trim().length === 0) {
      throw new Error("O nome da categoria é obrigatório");
    }
    if (nome.length > 100) {
      throw new Error(
        "O nome da categoria não pode ter mais que 100 caracteres"
      );
    }
  }

  toJSON() {
    return {
      id: this._id,
      nome: this._nome,
    };
  }
}
