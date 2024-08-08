"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locacoes = exports.users = exports.livros = void 0;
exports.livros = [
    {
        id_book: 1,
        titulo: "O Saber dos Antigos",
        isbn: "8515019302",
        edicao: "Edições Loyola",
        ano: "1999"
    },
    {
        id_book: 2,
        titulo: "O Senhor dos Anéis",
        isbn: "8595086354",
        edicao: "HarperCollins",
        ano: "2019"
    },
    {
        id_book: 3,
        titulo: "A Abolição do Homem",
        isbn: "8578601890",
        edicao: "Thomas Nelson Brasil",
        ano: "2017"
    },
    {
        id_book: 4,
        titulo: "Memórias do Subsolo",
        isbn: "8582852479",
        edicao: "Penguin-Companhia",
        ano: "2021"
    },
    {
        id_book: 5,
        titulo: "A trilogia tebana: Édipo Rei, Édipo em Colono, Antígona",
        isbn: "8571100810",
        edicao: "Zahar",
        ano: "1990"
    },
];
exports.users = [
    {
        id_user: 1,
        nome: "Raissa Moreira",
        cpf: "99999999999",
        senha: "raissa123",
    },
    {
        id_user: 2,
        nome: "Maria Bonita",
        cpf: "12345678956",
        senha: "maria123",
    },
    {
        id_user: 3,
        nome: "João das Pedras",
        cpf: "06245812369",
        senha: "joao123",
    },
    {
        id_user: 4,
        nome: "Juca Bala",
        cpf: "45612378912",
        senha: "juca123",
    },
];
exports.locacoes = [
    {
        id_user: 1,
        id_livro: 1,
        status: true,
    },
    {
        id_user: 1,
        id_livro: 4,
        status: true,
    },
    {
        id_user: 4,
        id_livro: 3,
        status: false,
    },
];
