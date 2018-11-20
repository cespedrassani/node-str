 

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    data: {
        type: Date,
        required: [true, 'A idade é obrigatória']
    },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario'
    },
    empregador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empregador'
    },
    vaga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaga'
    },
});

module.exports = mongoose.model('Contrato', schema);







