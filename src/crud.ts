import db from './database';
import { ILivros, ILocacoes, IUsers } from './types';

type QueryCallback = (err: Error | null, rows: any) => void;
interface IUpdateLivros {
  titulo: string;
  isbn: string;
  edicao: string;
  ano: string;
}

// POST
export const createLocacoes = (items: ILocacoes, callback: QueryCallback) => {
  const sql = `
       INSERT INTO locacoes (id_user, id_livro, status)
       VALUES (?, ?, ?)
     `;
  db.run(sql, [items?.id_user, items?.id_livro, items?.status], callback);
};

export const createLivros = (items: ILivros, callback: QueryCallback) => {
  const sql = `
       INSERT INTO livros (titulo, isbn, edicao, ano)
       VALUES (?, ?, ?, ?)
     `;
  db.run(sql, [items?.titulo, items?.isbn, items?.edicao, items?.ano], function (err) {
    callback(err, { lastID: this.lastID });
  });
};

export const createUsers = (items: IUsers, callback: QueryCallback) => {
  const sql = `
       INSERT INTO users (nome, cpf, senha)
       VALUES (?, ?, ?)
     `;
  db.run(sql, [items?.nome, items?.cpf, items?.senha], function (err) {
    callback(err, { lastID: this.lastID });
  });
};

// GET
export const readLivros = (callback: QueryCallback) => {
  const sql = 'SELECT * FROM livros';
  db.all(sql, [], callback);
};

export const readLivrosId = (id: number, callback: QueryCallback) => {
  const sql = 'SELECT * FROM livros WHERE id_livro = ?';
  db.all(sql, id, callback);
};

export const readLocacoes = (callback: QueryCallback) => {
  const sql = 'SELECT * FROM locacoes';
  db.all(sql, [], callback);
};

export const readUsers = (callback: QueryCallback) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], callback);
};

// PUT
export const updateLivro = (
  id: number,
  items: IUpdateLivros,
  callback: QueryCallback,
) => {
  const sql = `
       UPDATE livros
       SET titulo = ?, isbn = ?, edicao = ?, ano = ?
       WHERE id_livro = ?
     `;
  db.run(
    sql,
    [items?.titulo, items?.isbn, items?.edicao, items?.ano, id],
    callback,
  );
};

// DELETE
export const deleteUsers = (id: number, callback: QueryCallback) => {
  const sql = 'DELETE FROM users WHERE id_user = ?';
  db.run(sql, id, callback);
};

export const deleteLivros = (id: number, callback: QueryCallback) => {
  const sql = 'DELETE FROM livros WHERE id_livro = ?';
  db.run(sql, id, callback);
};

export const deleteLocacoes = (id: number, callback: QueryCallback) => {
  const sql = 'DELETE FROM locacoes WHERE id_livro = ?';
  db.run(sql, id, callback);
};
