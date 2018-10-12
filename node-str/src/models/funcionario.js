'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
    },
    cpf: {
        type: number,
        required: [true, 'O CPF é obrigatório'],
    },
    dtNascimento: {
        type: Date,
        required: [true, 'A idade é obrigatória'],
    },
    funcoes: [{
        type: String,
        required: [true, 'A função é obrigatória'],
        trim: true
    }],
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        trim: true
    },
    cidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cidade'    
    }
});

module.exports = mongoose.model('Funcionario', schema);