'use strict';

const mongoose = require('mongoose');
const Cidade = mongoose.model('Cidade');
const repository = require('../repositories/cidade-repository');

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

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
        });
        res.status(201).send({
            message: 'Cidade cadastrada!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
};