import Joi from 'joi';

export const livroUpdateModel = Joi.object({
  titulo: Joi.string().min(3),
  isbn: Joi.string(),
  edicao: Joi.string(),
  ano: Joi.string(),
});

export const livroModel = Joi.object({
  // id_livro: Joi.number().integer().required(),
  titulo: Joi.string().min(3).required(),
  isbn: Joi.string().required(),
  edicao: Joi.string().required(),
  ano: Joi.string().required(),
});

export const userModel = Joi.object({
  // id_user: Joi.number().integer().required(),
  nome: Joi.string().min(3).required(),
  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]{11}$/)
    .required(),
  senha: Joi.string().required(),
});

export const locModel = Joi.object({
  id_user: Joi.number().integer().required(),
  id_livro: Joi.number().integer().required(),
  status: Joi.boolean().default(true),
});
