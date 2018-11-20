'use strict';

const mongoose = require('mongoose');
const Vaga = mongoose.model('vaga');

exports.get = async () => {
    const res = await Vaga.find({
        ativa: true
    })
    .populate('empregador')
    .populate('funcionarios');
    
    return res;
}

exports.getById = async (id) => {
    const res = await Vaga.findById(id).populate('empregador');
    return res;
}

exports.getByNome = async (nome) => {
    const res = await Vaga
        .find({
            nome: nome,
            ativa: true
        }, 'nome ativa dateCriacao');
    return res;
}

exports.getByIdEmpregador = async (id) => {
    console.log(id);
    const res = await Vaga.find({
        empregador: id,
    }).populate('empregador');
    return res;
}

exports.create = async (data) => {
    console.log(data);
    var vaga = new Vaga(data);
    await vaga.save();
}

exports.update = async (id, data) => {
    console.log(id);
    await Vaga
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                ativa: data.ativa,
                descricao: data.descricao,
                dataCriacao: data.dataCriacao,
                candidatos: data.candidatos,
                empregador: data.empregador
            }
        });
}

exports.delete = async (id) => {
    await Vaga.findByIdAndRemove(id);
}