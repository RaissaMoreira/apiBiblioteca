import express from 'express';
import { readItems } from '../src/crud';
import db from './database';

const app = express();
app.use(express.json());

// // conectar ao banco de dados
// let db: any;

// // Função Autoexecutável Assíncrona
// (async () => {
//   try {
//     // db = await sqliteConnection();
//     db = await db;
//     console.log('Conexão com o banco de dados estabelecida com sucesso.');
//   } catch (error) {
//     console.error('Erro ao conectar ao banco de dados:', error);
//   }
// })();

// app.get('/bib/user', async (req, res) => {
//   try {
//     const users = await db?.all('SELECT * FROM users');
//     res?.status(200)?.json(users);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao buscar usuários.' });
//   }
// });

// app.get('/bib/livro', async (req, res) => {
//   try {
//     const livros = db?.all('SELECT * FROM livros', [], (err) => {
//       if (err) {
//         console.log('ERROR = ', err.message);
//       } else {
//         res?.status(200)?.json(livros);
//       }
//     });
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao buscar livros.', error });
//   }
// });
app.get('/bib/livro', async (req, res) => {
  readItems((err: any, rows: any) => {
    if (err) {
      res.status(500).send({ mensagem: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// app.get('/bib/livro/:id', async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const livro = await db?.get('SELECT * FROM livros WHERE id_book = ?', id);
//     // const livro = livros?.find((item) => item?.id_book === id);

//     if (!livro) {
//       return res?.status(404)?.send({
//         mensagem: 'Não existe um livro para o ID informado!',
//       });
//     }

//     res?.status(200)?.json(livro);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao buscar livro.' });
//   }
// });

// app.get('/bib/locar', async (req, res) => {
//   try {
//     const locacoes = await db?.all('SELECT * FROM locacoes');
//     const newListLoc = await Promise.all(
//       locacoes?.map(async (loc: ILocacoes) => {
//         const userName = await db?.get(
//           'SELECT nome FROM user WHERE id_user = ?',
//           loc?.id_user,
//         );
//         const bookName = await db?.get(
//           'SELECT TITULO FROM livros WHERE id_book = ?',
//           loc?.id_livro,
//         );
//         // const userName = users?.find((user) => user?.id_user == loc?.id_user);
//         // const bookName = livros?.find((livro) => livro?.id_book == loc?.id_livro);

//         return {
//           id_user: loc?.id_user,
//           nome_usuario: userName ? userName?.nome : 'Usuário não encontrado',
//           id_livro: loc?.id_livro,
//           titulo_livro: bookName ? bookName?.titulo : 'Livro não encontrado',
//           status: loc?.status,
//         };
//       }),
//     );

//     res.status(200).json(newListLoc);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao buscar locações.' });
//   }
// });

// app.put('/bib/livro/:id', async (req, res) => {
//   const id = Number(req.params.id);
//   const livroAlterado: ILivros = req.body;

//   const { error } = livroUpdateModel?.validate(livroAlterado);
//   if (error) {
//     return res.status(400).send({
//       mens: error.details[0].message,
//     });
//   }

//   // let livro = livros?.find((item: ILivros) => item?.id_book === id);
//   // if (!livro) {
//   //   return res?.status(404)?.send({
//   //     mensagem: 'Não existe um livro para o ID informado!',
//   //   });
//   // }
//   // const newLivros = livros?.map((el) =>
//   //   el?.id_book === id ? livroAlterado : el,
//   // );
//   // res?.status(200)?.json(newLivros);

//   try {
//     await db.run(
//       `
//       UPDATE livros
//       SET titulo = ?, isbn = ?, edicao = ?, ano = ?
//       WHERE id_book = ?
//     `,
//       [
//         livroAlterado.titulo,
//         livroAlterado.isbn,
//         livroAlterado.edicao,
//         livroAlterado.ano,
//         id,
//       ],
//     );

//     res.status(200).json(livroAlterado);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao atualizar o livro.' });
//   }
// });
// app.delete('/bib/user/:id', async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const userToRemove = await db?.run(
//       'DELETE FROM users WHERE id_user = ?',
//       id,
//     );

//     if (userToRemove?.changes === 0) {
//       return res.status(404).send({
//         mensagem: 'Usuário não encontrado para o ID informado!',
//       });
//     }

//     res.status(200).send({ mensagem: 'Usuário excluído com sucesso.' });
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao excluir o usuário.' });
//   }
//   // const userIndice = users?.findIndex((user: IUsers) => user?.id_user === id);

//   // if (userIndice < 0) {
//   //   return res?.status(404)?.send({
//   //     mensagem: 'Não existe um usuário para o ID informado!',
//   //   });
//   // }

//   // const removerUsuario = users?.splice(userIndice, 1);
//   // res?.status(200)?.json(removerUsuario);
// });
// app.post('/bib/user', async (req, res) => {
//   const newUser = req.body;

//   const { error } = userModel?.validate(newUser);
//   if (error) {
//     return res.status(400).send({
//       mens: error.details[0].message,
//     });
//   }

//   try {
//     const result = await db.run(
//       `
//       INSERT INTO users (nome, cpf, senha)
//       VALUES (?, ?, ?)
//     `,
//       [newUser.nome, newUser.cpf, newUser.senha],
//     );

//     newUser.id_user = result.lastID;
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao criar o usuário.' });
//   }
// });
app.post('/bib/livro', async (req, res) => {
  // const newBook = req.body;

  // const { error } = livroModel?.validate(newBook);
  // if (error) {
  //   return res.status(400).send({
  //     mens: error.details?.[0].message,
  //   });
  // }

  try {
    const sql = `INSERT INTO livros (titulo, isbn, edicao, ano) VALUES (?, ?, ?, ?)`;

    db.run(
      sql,
      ['O Senhor dos Anéis', '978-3-16-148410-0', '1ª Edição', '1954'],
      (err) => {
        if (err) {
          console.log('ERROR = ', err.message);
        } else {
          console.log(`Livro inserido`, err);
        }
      },
    );
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send({ mensagem: 'Erro ao criar o livro.' });
  }
});

// app.post('/bib/locar', async (req, res) => {
//   const newLoc = req.body;

//   const { error } = locModel?.validate(newLoc);
//   if (error) {
//     return res.status(400).send({
//       mens: error.details[0].message,
//     });
//   }

//   try {
//     await db.run(
//       `
//       INSERT INTO locacoes (id_user, id_livro, status)
//       VALUES (?, ?, ?)
//     `,
//       [newLoc.id_user, newLoc.id_livro, newLoc.status],
//     );

//     res.status(201).json(newLoc);
//   } catch (error) {
//     res.status(500).send({ mensagem: 'Erro ao criar a locação.' });
//   }
// });

app.listen(3333, () => console.log('BIBLIOTECA - API WEB executando'));
