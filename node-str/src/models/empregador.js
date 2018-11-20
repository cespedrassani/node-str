

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    cnpj: {
        type: Number,
        required: [true, 'O CNPJ é obrigatório'],
        trim: true
    },
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
    email: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('empregador', schema);