export interface ILivros {
    id_livro: number;
    titulo: string;
    isbn: string;
    edicao: string;
    ano: string;
}

export interface IUsers {
    id_user: number,
    nome: string;
    cpf: string;
    senha: string;
}

export interface ILocacoes {
    id_user: number,
    id_livro: number,
    status: boolean,
}