'use strict';

const mongoose = require('mongoose');
const Vaga = mongoose.model('Tipo');

exports.get = async () => {
    const res = await Vaga.find({
        ativa: true
    });
    return res;
}

exports.create = async (data) => {
    var vaga = new Vaga(data);
    await vaga.save();
}