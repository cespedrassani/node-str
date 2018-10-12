'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    data: {
        type: Date,
        default: Date.now
    },

    estabelecimento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    },

    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario'
    }
    
});

module.exports = mongoose.model('Contrato', schema);