
import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";
import PessoaModel from "./models/PessoaModel";
import { Pessoa } from "./models";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = 3003;
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

var pessoas: Array<PessoaModel> = [];
var pessoa = new PessoaModel("Marcos da Silva", 21, "marcos.silva@fatec.sp.gov.br","12912343567");
pessoas.push(pessoa);
pessoa = new PessoaModel("Ana Maria Brega", 25, "ana.brega@fatec.sp.gov.br","12999979999");
pessoas.push(pessoa);
pessoa = new PessoaModel("Paulo França", 18, "paulo.fraca@fatec.sp.gov.br","12999967999");
pessoas.push(pessoa);
pessoa = new PessoaModel("Edson Arantes", 30, "edson.arantes@gmail.sp.gov.br","12999957999");
pessoas.push(pessoa)

var x = 0;
pessoas.forEach(pessoa => {
    (async () => {
        pessoa.id = await fetch('http://localhost:3000/pessoa', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                nome: pessoa.nome,
                idade: pessoa.idade,
                email: pessoa.email,
                fone: pessoa.fone
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                //console.log(data); // a rotina retorna o ID do objeto cadastrado
                pessoas[x].id = data._id
                x++;
                return data._id;
            })
            .catch(error => {
                console.error(error); // mostra erro casso ocorra
            })
    })();
});