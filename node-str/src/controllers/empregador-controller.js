

'use strict';

const ValidatorContract = require('../validator/validator')
const repository = require('../repositories/empregador-repository');
const authService = require('../services/auth-service')
const md5 = require('md5');

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

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Deve ser um e-mail válido');
    contract.hasMinLen(req.body.senha, 8, 'A senha deve conter no mínimo 8 caracteres');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create({
            nome: req.body.nome,
            cnpj: req.body.cnpj,
            ativo: req.body.ativo,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });
        res.status(201).send({
            message: 'Empregador cadastrado!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.',
            data: e
        });

        res.status(400).send({
            error: 'Falha ao cadastrar o empregador.', 
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Deve ser um e-mail válido');
    contract.hasMinLen(req.body.senha, 8, 'A senha deve conter no mínimo 8 caracteres');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Empregador atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            error: 'Falha ao atualizar o Empregaodr!', 
            data: e
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Empregador removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });

        res.status(400).send({
            error: 'Falha ao remover o Empregador!', 
            data: e
        });
    }     
};

exports.authenticate = async(req, res, next) => {
    try {
        const empregador = await repository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });
        
        if (!empregador) {
            res.status(404).send({
                message: 'Empregador não encontrado',
                data: e
            })
        }
        const token = await authService.generateToken({
            nome: empregador.nome, 
            senha: empregador.senha,
            email: empregador.email,
            id: empregador._id
        });
        console.log(token)
        res.status(201).send({
            token: token,
            data: {
                email: empregador.email,
                nome: empregador.nome
            }
        })

    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.',
            data: e
        });
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-acces-token'];
        const data = await authService.decodeToken(token);
        
        const empregador = await repository.getById(data.id);

        if (!empregador) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
        }
        const tokenData = await authService.generateToken({
            nome: empregador.nome, 
            senha: empregador.senha,
            email: empregador.email,
            id: empregador._id
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: empregador.email,
                nome: empregador.nome
            }
        })

    } catch (e) {
        res.status(500).send({
            error: 'Falha ao processar requisição.'
        });
    }
}
