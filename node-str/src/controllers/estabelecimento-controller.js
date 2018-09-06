'use strict';

const mongoose = require('mongoose');
const Estabelecimento = mongoose.model('Estabelecimento');
const ValidatorContract = require('../validator/validator')
const repository = require('../repositories/estabelecimento-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
};

exports.getByNome = async(req, res, next) => {
    try {
        var data = await repository.getByNome(req.params.nome);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    } 
}

exports.getByRamo = async(req, res, next) => {
    try {
        var data = await repository.getByRamo(req.params.funcao);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    //contract.hasMinLen(req.body.funcao, 1, 'Deve conter pelo menos uma funcao');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Estabelecimento cadastrado!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            message: 'Falha ao cadastrar Estabelecimento.', 
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    //contract.hasMinLen(req.body.funcao, 1, 'Deve conter pelo menos uma funcao');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Estabelecimento atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            message: 'Falha ao atualizar o Estabelecimento!', 
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Estabelecimento removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            message: 'Falha ao remover o Estabelecimento!', 
            data: e
        });
    }     
};
