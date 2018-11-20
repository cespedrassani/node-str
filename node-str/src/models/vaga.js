

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
    },
    ativa: {
        type: Boolean,
        required: true,
        default: true
    },
    dataCriacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    empregador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empregador'
    },
    candidatos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'funcionario'
    }],

});

module.exports = mongoose.model('vaga', schema);