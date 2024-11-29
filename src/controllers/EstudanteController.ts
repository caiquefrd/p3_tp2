import { Request, Response } from 'express';
import { Estudante, Pessoa } from '../models';

interface ListInfo {
    ra: number,
    media: number,
    pessoa: {
        nome: string,
        email: string,
        fone: string
    }
}

class EstudanteController {

    public async create(req: Request, res: Response): Promise<any> {
        const { ra, media, pessoa } = req.body;
        try {
            const pessoa_doc = await Pessoa.findOne({ nome: pessoa }).select('_id');
            if (pessoa_doc) {
                const pessoa = pessoa_doc._id.toString();
                console.log(pessoa);
                const estudante = await Estudante.create({ ra, media, pessoa });
                const resp = await estudante.save();
                return res.status(201).json(resp);
            }
            else {
                const estudante = await Estudante.create({ ra, media, pessoa });
                const resp = await estudante.save();
                return res.status(201).json(resp);
            }
        } catch (error: any) {
            if (error && error.errors["ra"]) {
                return res.json({ message: error.errors["ra"].message });
            } else if (error && error.errors["media"]) {
                return res.json({ message: error.errors["media"].message });
            } else if (error && error.errors["pessoa"]) {
                return res.json({ message: error.errors["pessoa"].message });
            }
            return res.json({ message: error.message });
        }
    }

    public async list(_: Request, res: Response): Promise<any> {
        try {
            const list_info: ListInfo[] = [];
            const estudantes = await Estudante.find();
            for (var i = 0; i < estudantes.length; i++) {
                var pessoa_id = estudantes[i].pessoa;
                var pessoa_data = await Pessoa.findById(pessoa_id);
                if (pessoa_data) {
                    var list_item: ListInfo = {
                        ra: estudantes[i].ra,
                        media: estudantes[i].media,
                        pessoa: {
                            nome: pessoa_data.nome,
                            email: pessoa_data.email,
                            fone: pessoa_data.fone
                        }
                    }
                    list_info.push(list_item);
                }
            }
            return res.status(200).json(list_info);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        const { id, ra, media } = req.body;
        try {
            const estudante = await Estudante.findByIdAndUpdate(id, { ra: ra, media: media }, { new: true });
            if (estudante) {
                return res.json(estudante);
            } else {
                return res.status(404).json({ message: 'Estudate não encontrado' });
            }
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.body;
        try {
            const estudante = await Estudante.findByIdAndDelete(id);
            if (estudante) {
                return res.json(estudante);
            } else {
                return res.status(404).json({ message: 'Estudate não encontrado' });
            }
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new EstudanteController();
