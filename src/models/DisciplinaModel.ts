class DisciplinaModel{
    descricao: string;
    curso: string;
    semestre: number;

    constructor(descricao: string, curso: string, semestre: number){    
        this.descricao = descricao;
        this.curso = curso;
        this.semestre = semestre;
    }
}

export default DisciplinaModel