

'use strict';

const mongoose = require('mongoose');
const Empregador = mongoose.model('empregador');

exports.get = async () => {
    const res = await Empregador.find({
        ativo: true
    }).populate('vagas');
    return res;
}

exports.getByNome = async (name) => {
    const res = await Empregador
        .find({
            nome: name,
            ativo: true
        });
    return res;
}

exports.getById = async (id) => {
    const res = await Empregador.findById(id);
    return res;
}

exports.create = async (data) => {
    var empregador = new Empregador(data);
    await empregador.save();
}

exports.update = async (id, data) => {
    await Empregador
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                cnpj: data.cnpj,
            }
        });
}

exports.delete = async (id) => {
    await Empregador.findByIdAndRemove(id);
}

exports.authenticate = async (data) => {
    const rest = await Empregador.findOne({
        senha: data.senha,
        email: data.email,
    });
    return rest;
}