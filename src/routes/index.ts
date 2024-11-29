import { Router, Request, Response } from "express";
import estudante from './Estudante';
import pessoa from './Pessoa';
import disciplina from './Disciplina';

const routes = Router();

routes.use("/estudante", estudante);
routes.use("/pessoa", pessoa);
routes.use("/disciplina", disciplina);

// Handles any unmatched routes
routes.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Requisição desconhecida" });
});

export default routes;
