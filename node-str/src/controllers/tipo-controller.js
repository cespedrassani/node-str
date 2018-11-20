'use strict';

const repository = require('../repositories/tipo-repository');

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

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            nome: req.body.nome,
        });
        res.status(201).send({
            message: 'Tipo cadastrado!'
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

/*exports.put = async(req, res, next) => {
   try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Funcionário atualizado com sucesso!'
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
};*/

