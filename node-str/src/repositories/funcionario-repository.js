'use strict';

const mongoose = require('mongoose');
const Funcionario = mongoose.model('funcionario');

exports.get = async () => {
    const res = await Funcionario.find({
        ativo: true
    }, 'nome funcoes dtNascimento');
    return res;
}

exports.getByNome = async (name) => {
    const res = await Funcionario
        .find({
            nome: name,
            ativo: true
        }, 'nome funcoes dtNascimento');
    return res;
}

exports.getById = async (id) => {
    const res = await Funcionario.findById(id);
    return res;
}

exports.getByFuncao = async (funcao) => {
    const res = await Funcionario
        .find({
            funcoes: funcao,
            ativo: true
        }, 'nome funcoes dtNascimento');
    return res;
}

exports.create = async (data) => {
    var funcionario = new Funcionario(data);
    await funcionario.save();
}

exports.update = async (id, data) => {
    await Funcionario
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                dtNascimento: data.dtNascimento,
                funcoes: data.funcao
            }
        });
}

exports.delete = async (id) => {
    await Funcionario.findByIdAndRemove(id);
}

exports.authenticate = async (data) => {
    const rest = await Funcionario.findOne({
        senha: data.senha,
        email: data.nome,
    });
}