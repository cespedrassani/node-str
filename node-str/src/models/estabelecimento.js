'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
        index: true
    },
    cnpj: {
        type: number,
        required: [true, 'O CNPJ é obrigatório'],
    },
    ramos: [{
        type: String,
        required: [true, 'A função é obrigatória'],
        trim: true
    }],
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Estabelecimento', schema);