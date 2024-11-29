import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

function phoneMask(v: string | undefined) {
    if (v == undefined) {
    return
    }
    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length >= 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{5})(\d{0,5}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
    r = r.replace(/^(\d*)/, "($1");
    }
    return r;
    }

// define a rota para o pacote /routes
app.use(routes);
