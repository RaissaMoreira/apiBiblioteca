import sqlite3 from 'sqlite3';

const dbName = 'database.db';

const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.log('ERROR = ', err.message);
  } else {
    console.log('Banco conectado');

    db.exec(
      `
      CREATE TABLE IF NOT EXISTS livros (
        id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        isbn TEXT NOT NULL,
        edicao TEXT NOT NULL,
        ano TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS users (
        id_user INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf TEXT NOT NULL,
        senha TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS locacoes (
        id_user INTEGER NOT NULL,
        id_livro INTEGER NOT NULL,
        status BOOLEAN NOT NULL DEFAULT 0,
        PRIMARY KEY (id_user, id_livro),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
      );
    `,
      (err) => {
        if (err) {
          console.log('ERROR = ', err.message);
        } else {
          console.log('Tabelas criadas com sucesso');
        }
      },
    );
  }
});

export default db;

// export async function sqliteConnection() {
//   const database = await sqlite.open({
//     filename: path.resolve(__dirname, '..', 'database.db'), // O caminho resultante é o local onde o arquivo database.db será criado ou acessado.
//     driver: sqlite3.Database, // gerenciar a conexão com o banco de dados SQLite.
//   });

//   // Ler e executar o script SQL
//   const schemaPath = path.resolve(__dirname, '..', 'db', 'schema.sql');
//   const schemaSql = readFileSync(schemaPath, 'utf-8');
//   await database.exec(schemaSql);

//   console.log('Banco de dados e tabelas configurados com sucesso!');

//   return database;
// }
