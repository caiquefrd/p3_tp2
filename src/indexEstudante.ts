
import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import EstudanteModel from "./models/EstudanteModel";
import { Estudante } from "./models";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = 3002;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);

var estudantes: Array<EstudanteModel> = [];
var estudante = new EstudanteModel(101010, 8.0, "Marcos da Silva");
estudantes.push(estudante);
estudante = new EstudanteModel(100101, 9.5, "Ana Maria Brega");
estudantes.push(estudante);
estudante = new EstudanteModel(111111, 7, "Paulo França");
estudantes.push(estudante);

var x = 0;
estudantes.forEach(estudante => {
    console.log(estudante.pessoa);
    (async () => {
        estudante.id = await fetch('http://localhost:3000/estudante', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                ra: estudante.ra,
                media: estudante.media,
                pessoa: estudante.pessoa
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                //console.log(data); // a rotina retorna o ID do objeto cadastrado
                estudantes[x].id = data._id
                x++;
                return data._id;
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            })
    })();
});