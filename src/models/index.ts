import mongoose from "mongoose";
const { Schema } = mongoose;

const PessoaSchema = new Schema({
    nome: {
        required: true,
        type: String,
        maxLength: 50
    },
    idade: {
        required: true,
        type: Number,
        maxLength: 3,
    },
    email: {
        required: true,
        type: String,
        maxLength: 200
    },
    fone: {
        required: true,
        type: String,
        maxLength: 11
    }
});

const EstudanteSchema = new Schema({
    ra: {
        required: true,
        type: Number,
        maxLength: 10
    },
    media: {
        required: true,
        type: Number
    },
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    }
});

const DisciplinaSchema = new Schema({
    descricao : {
        required:true,
        type:Number,
        maxLength:60,
    },
    curso : {
        required:true,
        type:Number,
        maxLength:45
    },
    semestre: {
        required:true,
        type:Number,
        maxLength:2
    }
});

const Pessoa = mongoose.model("Pessoa", PessoaSchema);
const Estudante = mongoose.model("Estudante", EstudanteSchema);
const Disciplina = mongoose.model("Estudante", DisciplinaSchema);

export { Pessoa, Estudante, Disciplina};