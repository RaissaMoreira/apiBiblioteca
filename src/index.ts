import express from 'express';
import { livros, locacoes, users } from './db';
import { ILivros, ILocacoes, IUsers } from './types';
import {
  livroModel,
  livroUpdateModel,
  locModel,
  userModel,
} from './validations';

const app = express();
app.use(express.json());

async function getLivros() {
  const req = await fetch('http://localhost:5555/livros', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await req.json();
  return data;
}
async function getUsers() {
  const req = await fetch('http://localhost:5555/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await req.json();
  return data;
}
async function getLocacoes() {
  const req = await fetch('http://localhost:5555/locacoes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await req.json();
  return data;
}

app.get('/bib/user', (req, res) => {
  res?.status(200)?.json(users);
});
app.get('/bib/livro', (req, res) => {
  res?.status(200)?.json(livros);
});
app.get('/bib/livro/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros?.find((item) => item?.id_book === id);

  if (!livro) {
    return res?.status(404)?.send({
      mensagem: 'Não existe um livro para o ID informado!',
    });
  }

  res?.status(200)?.json(livro);
});
app.get('/bib/locar', (req, res) => {
  const newListLoc = locacoes?.map((loc: ILocacoes) => {
    const userName = users?.find((user) => user?.id_user == loc?.id_user);
    const bookName = livros?.find((livro) => livro?.id_book == loc?.id_livro);

    return {
      id_user: loc?.id_user,
      nome_usuario: userName ? userName?.nome : 'Usuário não encontrado',
      id_livro: loc?.id_livro,
      titulo_livro: bookName ? bookName?.titulo : 'Livro não encontrado',
      status: loc?.status,
    };
  });

  res.status(200).json(newListLoc);
});
app.put('/bib/livro/:id', (req, res) => {
  const id = Number(req.params.id);
  let livro = livros?.find((item: ILivros) => item?.id_book === id);

  if (!livro) {
    return res?.status(404)?.send({
      mensagem: 'Não existe um livro para o ID informado!',
    });
  }

  const livroAlterado: ILivros = req.body;

  const { error } = livroUpdateModel?.validate(livroAlterado);
  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  // console.log('livroAlterado == ', livroAlterado);

  const newLivros = livros?.map((el) =>
    el?.id_book === id ? livroAlterado : el,
  );

  // const campos = Object.keys(livroAlterado) as Array<keyof ILivros>;

  // for (let c of campos) {
  //   console.log('C == ', c);
  //   console.log('livro == ', livro);
  //   livro[c] = livroAlterado[c];
  // }

  res?.status(200)?.json(newLivros);
});
app.delete('/bib/user/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndice = users?.findIndex((user: IUsers) => user?.id_user === id);

  if (userIndice < 0) {
    return res?.status(404)?.send({
      mensagem: 'Não existe um usuário para o ID informado!',
    });
  }

  const removerUsuario = users?.splice(userIndice, 1);
  res?.status(200)?.json(removerUsuario);
});
app.post('/bib/user', (req, res) => {
  const newUser = req.body;

  const { error } = userModel?.validate(newUser);
  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  users.push(newUser);
  res?.status(200)?.send(newUser);
});
app.post('/bib/livro', (req, res) => {
  const newBook = req.body;

  const { error } = livroModel?.validate(newBook);
  if (error) {
    return res.status(400).send({
      mens: error.details?.[0].message,
    });
  }

  livros.push(newBook);
  res?.status(200)?.send(newBook);
});
app.post('/bib/locar', (req, res) => {
  const newLoc = req.body;

  const { error } = locModel?.validate(newLoc);
  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  locacoes.push(newLoc);
  res?.status(200)?.send(newLoc);
});
app.listen(3333, () => console.log('BIBLIOTECA - API WEB executando'));
