'use strict';

const repository = require('../repositories/vaga-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    }
};
exports.getByDescricao = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    }
}
exports.getByNome = async(req, res, next) => {
    try {
        var data = await repository.getByNome(req.params.nome);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    }
}
exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    } 
}
exports.getByIdEmpregador = async(req, res, next) => {
    try {
        var data = await repository.getByIdEmpregador(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    } 
}

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            nome: req.body.nome,
            ativa: req.body.ativa,
            descricao: req.body.descricao,
            dataCriacao: req.body.dataCriacao,
            candidatos: req.body.candidatos,
            empregador: req.body.empregador
        });
        res.status(201).send({
            message: 'Vaga cadastrada!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.',
            data: e
        });

        res.status(400).send({
            error: 'Falha ao cadastrar a vaga.', 
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
   try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Vaga atualizada com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            error: 'Falha ao atualizar o funcionário!', 
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Vaga removida com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            error: 'Falha ao remover a vaga!', 
            data: e
        });
    }     
};

