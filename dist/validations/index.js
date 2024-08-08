"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locModel = exports.userModel = exports.livroModel = exports.livroUpdateModel = void 0;
const joi_1 = __importDefault(require("joi"));
exports.livroUpdateModel = joi_1.default.object({
    titulo: joi_1.default.string().min(3),
    isbn: joi_1.default.string(),
    edicao: joi_1.default.string(),
    ano: joi_1.default.string(),
});
exports.livroModel = joi_1.default.object({
    id_book: joi_1.default.number().integer().required(),
    titulo: joi_1.default.string().min(3).required(),
    isbn: joi_1.default.string().required(),
    edicao: joi_1.default.string().required(),
    ano: joi_1.default.string().required(),
});
exports.userModel = joi_1.default.object({
    id_user: joi_1.default.number().integer().required(),
    nome: joi_1.default.string().min(3).required(),
    cpf: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]{11}$/)
        .required(),
    senha: joi_1.default.string().required(),
});
exports.locModel = joi_1.default.object({
    id_user: joi_1.default.number().integer().required(),
    id_livro: joi_1.default.number().integer().required(),
    status: joi_1.default.boolean().default(true),
});
