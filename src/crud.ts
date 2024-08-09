import db from './database';

export const readItems = (callback) => {
  const sql = 'SELECT * FROM livros';
  db.all(sql, [], callback);
};
