
import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import DisciplinaModel from "./models/DisciplinaModel";
import { Disciplina } from "./models";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = 3001;
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

var disciplinas: Array<DisciplinaModel> = [];
var disciplina = new DisciplinaModel("Técnicas de Programação I", "DSM", 2);
disciplinas.push(disciplina);
disciplina = new DisciplinaModel("Técnicas de Programação II", "DSM", 3);
disciplinas.push(disciplina);
disciplina = new DisciplinaModel("Banco de Dados Não Relacional", "DSM", 3);
disciplinas.push(disciplina);
var disciplina = new DisciplinaModel("Programação Web I", "DSM", 2);
disciplinas.push(disciplina);
var disciplina = new DisciplinaModel("Programação Web II", "DSM", 3);
disciplinas.push(disciplina);

var x = 0;
disciplinas.forEach(disciplina => {
    (async () => {
        disciplina.id = await fetch('http://localhost:3000/disciplina', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                descricao: disciplina.descricao,
                curso: disciplina.curso,
                semestre: disciplina.semestre,
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                //console.log(data); // a rotina retorna o ID do objeto cadastrado
                disciplinas[x].id = data._id
                x++;
                return data._id;
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            })
    })();
});