CREATE TABLE livros (
    id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    isbn TEXT NOT NULL,
    edicao TEXT NOT NULL,
    ano TEXT NOT NULL,
);

CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    senha TEXT NOT NULL,
);

CREATE TABLE locacoes (
    id_user INTEGER NOT NULL,
    id_livro INTEGER NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id_user, id_livro),
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
);