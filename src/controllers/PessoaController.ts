import { Request, Response } from "express";
import { Pessoa } from "../models";

class PessoaController {
  public async create(req: Request, res: Response):Promise<any> {
    const { nome, idade, email, fone } = req.body;
    try {
      const pessoa = await Pessoa.create({ nome, idade, email, fone });
      const resp = await pessoa.save();
      return res.status(201).json(resp);
    } catch (error:any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "Este e-mail já está em uso!" });
      } else if (error && error.errors["mail"]) {
        return res.json({ message: error.errors["mail"].message });
      } else if (error && error.errors["nome"]) {
        return res.json({ message: error.errors["nome"].message });
      } else if (error && error.errors["fone"]) {
        return res.json({ message: error.errors["fone"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response):Promise<any> {
    try {
    const pessoas = await Pessoa.find().sort({ nome: 1 });
      return res.json(pessoas);
    } catch (error:any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response):Promise<any> {
    const { id } = req.params;
    const { nome, idade, email, fone } = req.body;
    try {
      const pessoa = await Pessoa.findById(id);
      if (!pessoa) {
        return res.json({ message: "Registro não encontrado!" });
      }
      pessoa.nome = nome;
      pessoa.idade = idade;
      pessoa.email = email;
      pessoa.fone = fone;
      const resp = await pessoa.save();
      return res.json(resp);
    } catch (error:any) {
      if (error.code === 11000 || error.code === 11001) {
        return res.json({ message: "Este e-mail já está em uso!" });
      } else if (error && error.errors["mail"]) {
        return res.json({ message: error.errors["mail"].message });
      } else if (error && error.errors["nome"]) {
        return res.json({ message: error.errors["nome"].message });
      } else if (error && error.errors["fone"]) {
        return res.json({ message: error.errors["fone"].message });
      }
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response):Promise<any> {
    const { id } = req.params;
    try {
      const pessoa = await Pessoa.findByIdAndDelete(id);
      if (pessoa) {
        return res
          .status(404)
          .json({ message: "Registro excluído com sucesso!" });
      } else {
        return res.json({ message: "Registro não encontrado" });
      }
    } catch (error:any) {
      return res.json({ message: error.message });
    }
  }
}

export default new PessoaController();
