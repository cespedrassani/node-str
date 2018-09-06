'use strict';

const mongoose = require('mongoose');
const Estabelecimento = mongoose.model('Estabelecimento');

exports.get = async () => {
    const res = await Estabelecimento.find({
        ativo: true
    }, 'nome ramos');
    return res;
}

exports.getByNome = async (name) => {
    const res = await Estabelecimento
        .find({
            nome: name,
            ativo: true
        }, 'nome ramos');
    return res;
}

exports.getById = async (id) => {
    const res = await Estabelecimento.findById(id);
    return res;
}

exports.getByRamo = async (ramo) => {
    const res = await Estabelecimento
        .find({
            ramos: ramo,
            ativo: true
        }, 'nome ramos');
    return res;
}

exports.create = async (data) => {
    var Estabelecimento = new Estabelecimento(data);
    await Estabelecimento.save();
}

exports.update = async (id, data) => {
    await Estabelecimento
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                cnpj: data.cnpj,
                ramos: data.ramo
            }
        });
}

exports.delete = async (id) => {
    await Estabelecimento.findByIdAndRemove(id);
}