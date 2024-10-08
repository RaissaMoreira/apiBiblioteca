"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("./validations");
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
let locacoes = [];
let livros = [];
function getLivros() {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield fetch('http://localhost:5555/livros', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = yield req.json();
        return data;
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield fetch('http://localhost:5555/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = yield req.json();
        return data;
    });
}
function getLocacoes() {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield fetch('http://localhost:5555/locacoes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = yield req.json();
        return data;
    });
}
function initializeData() {
    return __awaiter(this, void 0, void 0, function* () {
        users = yield getUsers();
        livros = yield getLivros();
        locacoes = yield getLocacoes();
        console.log('users = ', users);
    });
}
app.get('/bib/user', (req, res) => {
    var _a;
    (_a = res === null || res === void 0 ? void 0 : res.status(200)) === null || _a === void 0 ? void 0 : _a.json(users);
});
app.get('/bib/livro', (req, res) => {
    var _a;
    (_a = res === null || res === void 0 ? void 0 : res.status(200)) === null || _a === void 0 ? void 0 : _a.json(livros);
});
app.get('/bib/livro/:id', (req, res) => {
    var _a, _b;
    const id = Number(req.params.id);
    const livro = livros === null || livros === void 0 ? void 0 : livros.find((item) => (item === null || item === void 0 ? void 0 : item.id_book) === id);
    if (!livro) {
        return (_a = res === null || res === void 0 ? void 0 : res.status(404)) === null || _a === void 0 ? void 0 : _a.send({
            mensagem: 'Não existe um livro para o ID informado!',
        });
    }
    (_b = res === null || res === void 0 ? void 0 : res.status(200)) === null || _b === void 0 ? void 0 : _b.json(livro);
});
app.get('/bib/locar', (req, res) => {
    const newListLoc = locacoes === null || locacoes === void 0 ? void 0 : locacoes.map((loc) => {
        const userName = users === null || users === void 0 ? void 0 : users.find((user) => (user === null || user === void 0 ? void 0 : user.id_user) == (loc === null || loc === void 0 ? void 0 : loc.id_user));
        const bookName = livros === null || livros === void 0 ? void 0 : livros.find((livro) => (livro === null || livro === void 0 ? void 0 : livro.id_book) == (loc === null || loc === void 0 ? void 0 : loc.id_livro));
        return {
            id_user: loc === null || loc === void 0 ? void 0 : loc.id_user,
            nome_usuario: userName ? userName === null || userName === void 0 ? void 0 : userName.nome : 'Usuário não encontrado',
            id_livro: loc === null || loc === void 0 ? void 0 : loc.id_livro,
            titulo_livro: bookName ? bookName === null || bookName === void 0 ? void 0 : bookName.titulo : 'Livro não encontrado',
            status: loc === null || loc === void 0 ? void 0 : loc.status,
        };
    });
    res.status(200).json(newListLoc);
});
app.put('/bib/livro/:id', (req, res) => {
    var _a, _b;
    const id = Number(req.params.id);
    let livro = livros === null || livros === void 0 ? void 0 : livros.find((item) => (item === null || item === void 0 ? void 0 : item.id_book) === id);
    if (!livro) {
        return (_a = res === null || res === void 0 ? void 0 : res.status(404)) === null || _a === void 0 ? void 0 : _a.send({
            mensagem: 'Não existe um livro para o ID informado!',
        });
    }
    const livroAlterado = req.body;
    const { error } = validations_1.livroUpdateModel === null || validations_1.livroUpdateModel === void 0 ? void 0 : validations_1.livroUpdateModel.validate(livroAlterado);
    if (error) {
        return res.status(400).send({
            mens: error.details[0].message,
        });
    }
    // console.log('livroAlterado == ', livroAlterado);
    const newLivros = livros === null || livros === void 0 ? void 0 : livros.map((el) => (el === null || el === void 0 ? void 0 : el.id_book) === id ? livroAlterado : el);
    // const campos = Object.keys(livroAlterado) as Array<keyof ILivros>;
    // for (let c of campos) {
    //   console.log('C == ', c);
    //   console.log('livro == ', livro);
    //   livro[c] = livroAlterado[c];
    // }
    (_b = res === null || res === void 0 ? void 0 : res.status(200)) === null || _b === void 0 ? void 0 : _b.json(newLivros);
});
app.delete('/bib/user/:id', (req, res) => {
    var _a, _b;
    const id = Number(req.params.id);
    const userIndice = users === null || users === void 0 ? void 0 : users.findIndex((user) => (user === null || user === void 0 ? void 0 : user.id_user) === id);
    if (userIndice < 0) {
        return (_a = res === null || res === void 0 ? void 0 : res.status(404)) === null || _a === void 0 ? void 0 : _a.send({
            mensagem: 'Não existe um usuário para o ID informado!',
        });
    }
    const removerUsuario = users === null || users === void 0 ? void 0 : users.splice(userIndice, 1);
    (_b = res === null || res === void 0 ? void 0 : res.status(200)) === null || _b === void 0 ? void 0 : _b.json(removerUsuario);
});
app.post('/bib/user', (req, res) => {
    var _a;
    const newUser = req.body;
    const { error } = validations_1.userModel === null || validations_1.userModel === void 0 ? void 0 : validations_1.userModel.validate(newUser);
    if (error) {
        return res.status(400).send({
            mens: error.details[0].message,
        });
    }
    users.push(newUser);
    (_a = res === null || res === void 0 ? void 0 : res.status(200)) === null || _a === void 0 ? void 0 : _a.send(newUser);
});
app.post('/bib/livro', (req, res) => {
    var _a, _b;
    const newBook = req.body;
    const { error } = validations_1.livroModel === null || validations_1.livroModel === void 0 ? void 0 : validations_1.livroModel.validate(newBook);
    if (error) {
        return res.status(400).send({
            mens: (_a = error.details) === null || _a === void 0 ? void 0 : _a[0].message,
        });
    }
    livros.push(newBook);
    (_b = res === null || res === void 0 ? void 0 : res.status(200)) === null || _b === void 0 ? void 0 : _b.send(newBook);
});
app.post('/bib/locar', (req, res) => {
    var _a;
    const newLoc = req.body;
    const { error } = validations_1.locModel === null || validations_1.locModel === void 0 ? void 0 : validations_1.locModel.validate(newLoc);
    if (error) {
        return res.status(400).send({
            mens: error.details[0].message,
        });
    }
    locacoes.push(newLoc);
    (_a = res === null || res === void 0 ? void 0 : res.status(200)) === null || _a === void 0 ? void 0 : _a.send(newLoc);
});
initializeData().then(() => {
    app.listen(3333, () => console.log('BIBLIOTECA - API WEB executando'));
});
