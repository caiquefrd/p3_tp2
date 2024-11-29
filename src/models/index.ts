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
        maxLength: 200,
        validate: {
            validator: function (mail:string) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const validDomainRegex = /@(etec|fatec|cps)\.sp\.gov\.br$/;
              return emailRegex.test(mail) && validDomainRegex.test(mail);
            },
            message: 'is not a valid email address for Centro Paula Souza.'
          }
    },
    fone: {
        required: true,
        type: String,
        maxLength: 11,
        validate: {
            validator: function (phone:string) {
                const ddds = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,
                    43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,
                    83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];
              const phoneRegex =  /^[0-9]{10,11}$/;
              return phoneRegex.test(phone) && ddds.includes(parseInt(phone.substring(0,2)));
            },
            message : 'is not a valid phone number.'    
        }
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
        required: true,
        validate: {
            validator: function (pessoa:string) {
                const existing_person = Pessoa.findById(pessoa);
                return existing_person != null;
            },
            message: 'person does not exist.'
        }
    }
});

const DisciplinaSchema = new Schema({
    descricao : {
        required:true,
        type:String,
        maxLength:60,
    },
    curso : {
        required:true,
        type:String,
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
const Disciplina = mongoose.model("Disciplina", DisciplinaSchema);

export { Pessoa, Estudante, Disciplina };