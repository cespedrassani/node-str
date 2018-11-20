'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/vaga-controller');

router.get('/buscar', controller.get);
router.get('/buscar/:nome', controller.getByNome);
router.get('/buscar/id/:id', controller.getById);
router.get('/buscar/empregador/:id', controller.getByIdEmpregador);
router.post('/criar', controller.post);
router.put('/editar/:id', controller.put);
router.delete('/deletar/:id', controller.delete);

module.exports = router;