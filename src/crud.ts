import db from './database';

type QueryCallback = (err: Error | null, rows: any[]) => void;
interface IUpdateLivros {
  titulo: string;
  isbn: string;
  edicao: string;
  ano: string;
}

// POST
export const createItems = (callback: QueryCallback) => {
  const sql = `
       INSERT INTO locacoes (id_user, id_livro, status)
       VALUES (?, ?, ?)
     `;
  db.all(sql, [], callback);
};

// GET
export const readLivros = (callback: QueryCallback) => {
  const sql = 'SELECT * FROM livros';
  db.all(sql, [], callback);
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
export const updateItems = (
  id: number,
  items: IUpdateLivros,
  callback: QueryCallback,
) => {
  const sql = `
       UPDATE livros
       SET titulo = ?, isbn = ?, edicao = ?, ano = ?
       WHERE id_book = ?
     `;
  db.run(
    sql,
    [items?.titulo, items?.isbn, items?.edicao, items?.ano, id],
    callback,
  );
};

// DELETE
export const deleteUsers = (id: number, callback: QueryCallback) => {
  const sql = 'DELETE * FROM users WHERE id = ?';
  db.run(sql, id, callback);
};

export const deleteLivros = (id: number, callback: QueryCallback) => {
  const sql = 'DELETE * FROM livros WHERE id = ?';
  db.run(sql, id, callback);
};
