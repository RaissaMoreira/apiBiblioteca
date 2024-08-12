import express from 'express';
import { createLivros, createLocacoes, createUsers, deleteLivros, deleteLocacoes, deleteUsers, readLivros, readLivrosId, readLocacoes, readUsers, updateLivro } from './crud';
import { ILivros } from './types';
import { livroModel, livroUpdateModel, locModel, userModel } from './validations';

const app = express();
app.use(express.json());

app.get('/bib/user', async (req, res) => {
  readUsers((err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: "Não foi possível buscar os usuários!" });
    } else {
      res.status(200).json(rows);
    }
  })
});

app.get('/bib/livro', async (req, res) => {
  readLivros((err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: "Não foi possível buscar os livros!" });
    } else {
      res.status(200).json(rows);
    }
  })
});

app.get('/bib/livro/:id', async (req, res) => {
  const id = Number(req.params.id);

  readLivrosId(id, (err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: "Não foi possível encontrar o livro!" });
    } else {
      res.status(200).json(rows);
    }
  })
});

app.get('/bib/locar', async (req, res) => {
  readLocacoes((err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: "Não foi possível buscar as locações!" });
    } else {
      res.status(200).json(rows);
    }
  })
});

app.put('/bib/livro/:id', async (req, res) => {
  const id = Number(req.params.id);
  const livroAlterado: ILivros = req.body;
  const { error } = livroUpdateModel?.validate(livroAlterado);
  
  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  updateLivro(id, livroAlterado, (error) => {
    if (error) {
      res.status(500).send({ mensagem: 'Erro ao atualizar o livro.' });
    }
    
    res.status(200).send({ mensagem: 'Livro atualizado com sucesso.' });
  })
});

app.delete('/bib/user/:id', async (req, res) => {
  const id = Number(req.params.id);

  deleteUsers(id, (err) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao excluir o usuário.' });
    }
    
    res.status(200).send({ mensagem: 'Usuário excluído com sucesso.' });
  });
});

app.delete('/bib/locar/:id', async (req, res) => {
  const id = Number(req.params.id);

  deleteLocacoes(id, (err) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao excluir a locação.' });
    }
    
    res.status(200).send({ mensagem: 'Locação excluída com sucesso.' });
  });
});

app.delete('/bib/livro/:id', async (req, res) => {
  const id = Number(req.params.id);

  deleteLivros(id, (err) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao excluir o livro.' });
    }
    
    res.status(200).send({ mensagem: 'Livro excluído com sucesso.' });
  });
});

app.post('/bib/user', async (req, res) => {
  const newUser = req.body;
  const { error } = userModel?.validate(newUser);
  
  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  createUsers(newUser, (err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao criar o usuário.' });
    }
    
    newUser.id_user = rows?.lastID;
    res.status(201).json(newUser);
  });
});

app.post('/bib/livro', async (req, res) => {
  const newBook = req.body;
  const { error } = livroModel?.validate(newBook);
  
  if (error) {
    return res.status(400).send({
      mens: error.details?.[0].message,
    });
  }

  createLivros(newBook, (err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao criar o livro.' });
    }
    
    newBook.id_livro = rows?.lastID;
    res.status(201).json(newBook);
  });
});

app.post('/bib/locar', async (req, res) => {
  const newLoc = req.body;
  const { error } = locModel?.validate(newLoc);

  if (error) {
    return res.status(400).send({
      mens: error.details[0].message,
    });
  }

  createLocacoes(newLoc, (err, rows) => {
    if (err) {
      res.status(500).send({ mensagem: 'Erro ao criar a locação.' });
    }
    
    newLoc.id_user = rows?.lastID;
    res.status(201).json(newLoc);
  });
});

app.listen(3333, () => console.log('BIBLIOTECA - API WEB executando'));
