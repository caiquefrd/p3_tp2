import { Pessoa } from './index';

class EstudanteModel{
    ra: number;
    media: number;
    pessoa: string;

    constructor(ra: number, media: number, pessoa: string){
        this.ra = ra;
        this.media = media;
        this.pessoa = pessoa;
    }
}

export default EstudanteModel