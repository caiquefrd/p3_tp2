import { Request, Response } from "express";
import { Disciplina } from "../models"

class DisciplinaController {

    public async create(req: Request, res: Response):Promise<any> {
        const {descricao, curso, semestre} = req.body;
        try {
            console.log('log');
            console.log(descricao, curso, semestre);
            const disciplina = await Disciplina.create({descricao, curso, semestre});
            const resp = await disciplina.save();
            return res.status(201).json(resp);
        } catch (error:any) {
            if (error && error.errors["descricao"]) {
              return res.json({ message: error.errors["descricao"].message });
            } else if (error && error.errors["curso"]) {
              return res.json({ message: error.errors["curso"].message });
            } else if (error && error.errors["semestre"]) {
                return res.json({ message: error.errors["semestre"].message });
              }
            return res.json({ message: error.message });
          }
    }

    public async list(_: Request, res: Response):Promise<any> {
        try {
            const disciplinas = await Disciplina.find().sort({ descricao: 1 });
            return res.json(disciplinas);
        } catch (error:any) {
            return res.json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response):Promise<any> {
        const { id, descricao, curso, semestre } = req.body;
        try {
            const disciplina = await Disciplina.findById(id);
            if (!disciplina) {
                return res.json({ message: "Registro não encontrado!" });
            }
            disciplina.descricao = descricao;
            disciplina.curso = curso;
            disciplina.semestre = semestre;
            const resp = await disciplina.save();
            return res.json(resp);
        } catch (error:any) {
            if (error && error.errors["descricao"]) {
                return res.json({ message: error.errors["descricao"].message });
              } else if (error && error.errors["curso"]) {
                return res.json({ message: error.errors["curso"].message });
              } else if (error && error.errors["semestre"]) {
                  return res.json({ message: error.errors["semestre"].message });
                }
            return res.json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response):Promise<any> {
        const { id } = req.body;
        try {
            const disciplina = await Disciplina.findByIdAndDelete(id);
            if(disciplina){
                return res.json(disciplina);
            } else {
                return res.status(404).json({ message: 'Disciplina não encontrada' });
            }
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new DisciplinaController();  